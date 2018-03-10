class TradiesController < ApplicationController 
  before_action :require_login, only:[:create]
  
  # before_action(only:[:show,:index]) {allow("AgencyAdmin")}
  
  
  def create
    
    @user = User.find_by(email:params[:trady][:email].gsub(/\s+/, "").downcase)
    #params[:trady][:email].gsub(/\s+/, "").downcase!
    @trady = Trady.new(trady_params)
    
    mr = MaintenanceRequest.find_by(id:params[:trady][:maintenance_request_id])
    
    if mr.agent == nil  
      name = "#{mr.agency_admin.first_name.capitalize}" + " #{mr.agency_admin.last_name.capitalize}"
    elsif mr.agency_admin == nil  
      name = "#{mr.agent.name.capitalize}" + " #{mr.agent.last_name.capitalize}"
    end

    if mr.agency_admin != nil
      if mr.agency_admin.agency.tradies !=nil
        @all_tradies = mr.agency_admin.agency.skilled_tradies_required(mr.service_type) 
      else 
        @all_tradies= []
      end 
    end 

    if mr.agent != nil
      if mr.agent.agency.tradies !=nil 
        @all_tradies = mr.agent.agency.skilled_tradies_required(mr.service_type) 
      else 
        @all_tradies= []
      end
    end

    agency_admin = mr.agency_admin
    agent = mr.agent
    if agency_admin == nil
      @agency = agent.agency
    elsif agent == nil
      @agency = agency_admin.agency
    end 


    if @user
      existing_role = @user.get_role("Trady").present?
    end 
    
    if @user && existing_role == false
      
      role = Role.new(user_id:@user.id)
      @trady = Trady.create(trady_params)
      @trady.update_attribute(:user_id, @user.id)
      @trady.roles << role
      role.save
      Skill.create(trady_id:@trady.id, skill:mr.service_type )
      if AgencyTrady.where(:agency_id=>@agency.id, :trady_id => @user.trady.id).present? 
        #do nothing
      else
        AgencyTrady.create(agency_id:@agency.id,trady_id:@user.trady.id)
      end
        
      if params[:trady][:trady_request] == "Quote"
        TradyEmailWorker.perform_async(@user.trady.id,mr.id)
        log = Log.create(maintenance_request_id:mr.id, action:"Quote request sent to #{@trady.capitalize_company_name} by: ", name:name)
        quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
        if quote_request
          #do nothing
        else
          QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
        end
        TenantQuoteRequestedNotificationEmailWorker.perform_async(mr.id,@trady.id) 

        mr.action_status.update_columns(agent_status:"Awaiting Quote", trady_status:"Appointment Required")

      elsif params[:trady][:trady_request] == "Work Order"
        log = Log.create(maintenance_request_id:mr.id, action:"Work order sent to #{@trady.capitalize_company_name} by: ", name:name)
        TradyWorkOrderEmailWorker.perform_async(@user.trady.id, mr.id)
        mr.update_attribute(:trady_id, @user.trady.id )

        mr.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Appointment Required")

      end 
      
      #mr.action_status.update_attribute(:agent_status,"Awaiting Tradie Initiation")
       

       if mr.trady
        @hired_trady = mr.trady.as_json({:include => :trady_company})
       end 
      respond_to do |format|
        format.json{render :json=>{all_tradies:@all_tradies, added_trady:@trady, hired_trady:@hired_trady, log:log}}
      end
    elsif @user && existing_role == true

      skill = @user.trady.skills.where(skill:mr.service_type).first

      if skill
        #do nothing
      else
        Skill.create(trady_id:@user.trady.id, skill:mr.service_type)
      end 
      
      if AgencyTrady.where(:agency_id=>@agency.id, :trady_id => @user.trady.id).present? 
        #do nothing
      else
        AgencyTrady.create(agency_id:@agency.id,trady_id:@user.trady.id)
      end
        
      if params[:trady][:trady_request] == "Quote"
        TradyEmailWorker.perform_async(@user.trady.id,mr.id)
        log = Log.create(maintenance_request_id:mr.id, action:"Quote request sent to #{@user.trady.capitalize_company_name} by: ", name:name)
        quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
        TenantQuoteRequestedNotificationEmailWorker.perform_async(mr.id,@user.trady.id)
        if quote_request
          #do nothing
        else
          QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
        end


        mr.action_status.update_columns(agent_status:"Awaiting Quote", trady_status:"Appointment Required")


      elsif params[:trady][:trady_request] == "Work Order"
        log = Log.create(maintenance_request_id:mr.id, action:"Work order sent to #{@user.trady.capitalize_company_name} by: ", name:name)
        TradyWorkOrderEmailWorker.perform_async(@user.trady.id, mr.id)
        mr.update_attribute(:trady_id, @user.trady.id )

        mr.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Appointment Required")

      end 
      
      #mr.action_status.update_attribute(:agent_status,"Awaiting Tradie Initiation")
      
      if mr.trady
        @hired_trady = mr.trady.as_json({:include => :trady_company})
       end 
      respond_to do |format|
        format.json{render :json=>{all_tradies:@all_tradies, added_trady:@trady, hired_trady:@hired_trady, log:log}}
      end

####NEW USER STARTS HERE
    else 
      if @trady.valid?
        
        @user = User.create(email:params[:trady][:email],password:SecureRandom.hex(5))
        @trady.user_id = @user.id
        #@trady.skill = params[:trady][:skill_required]

        role = Role.create(user_id:@user.id)
        @trady.roles << role
        @trady.save
        Skill.create(trady_id:@trady.id, skill:mr.service_type )
        #UserSetPasswordEmailWorker.perform_in(5.minutes, @user.id)
       
            
        if params[:trady][:trady_request] == "Quote"
          log = Log.create(maintenance_request_id:mr.id, action:"Quote request sent to #{@trady.capitalize_company_name} by: ", name:name)
          TradyEmailWorker.perform_async(@user.trady.id,mr.id)
          TradyStatus.create(maintenance_request_id:mr.id,status:"Quote Requested")
          quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
          TenantQuoteRequestedNotificationEmailWorker.perform_async(mr.id,@trady.id)
          if quote_request
            #do nothing
          else
            QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
          end

          mr.action_status.update_columns(agent_status:"Awaiting Quote", trady_status:"Appointment Required") 

        elsif params[:trady][:trady_request] == "Work Order"
          log = Log.create(maintenance_request_id:mr.id, action:"Work Order sent to #{@trady.capitalize_company_name} by: ", name:name)
          
          TradyWorkOrderEmailWorker.perform_async(@trady.id, mr.id)
          mr.update_attribute(:trady_id, @trady.id )

          mr.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Appointment Required")

        end 

        # mr.action_status.update_attribute(:agent_status,"Awaiting Tradie Initiation")
        
        AgencyTrady.create(agency_id:@agency.id,trady_id:@trady.id)
      
      if mr.trady
        @hired_trady = mr.trady.as_json({:include => :trady_company})
       end 
      respond_to do |format|
        format.json{render :json=>{all_tradies:@all_tradies, added_trady:@trady, hired_trady:@hired_trady, log:log}}
      end
      else
        respond_to do |format|
          format.json{render :json=>{errors:@trady.errors.to_hash(true).as_json}}
        end 
      end
    end 
 
    #TenantQuoteRequestedNotificationEmailWorker.perform_async(mr.id)


  end


  def edit
    @trady = Trady.find_by(id:params[:id])
    if @trady.trady_company
      @trady_company = @trady.trady_company
    else
      @trady_company = nil
    end 


    if @trady.trady_profile_image
      @profile_image = @trady.trady_profile_image.image_url
      @trady_profile_image = @trady.trady_profile_image
    else
      @profile_image = nil
    end


  end 

  def update
    @trady = Trady.find_by(id:params[:id])

    if @trady.update(trady_params)
      flash[:success] = "You have successfully updated your profile information."
      redirect_to edit_trady_path(@trady)
    else
      flash[:danger] = "Oops it looks something went wrong. Please add all information below."
      respond_to do |format|
          format.json {render :json=>{errors: @trady.errors.to_hash(true).as_json}}
          format.html {render :edit}
        end 
    end 
  end

      
 

  private

  def trady_params
    params.require(:trady).permit(:id,:user_id,:tradie_company_id,:name,:mobile,:email,:skill,:maintenance_request_id,:skill_required, :company_name, :trady_request)
    
  end


end 

  

         