class TradiesController < ApplicationController 
  before_action :require_login, only:[:create]
  before_action :jfmo_terms_and_conditions, only:[:edit]
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

        mr.action_status.update_columns(agent_status:"Awaiting Quote", trady_status:"Quote Requests")

      elsif params[:trady][:trady_request] == "Work Order"
        log = Log.create(maintenance_request_id:mr.id, action:"Work order sent to #{@trady.capitalize_company_name} by: ", name:name)
        TradyWorkOrderEmailWorker.perform_async(@user.trady.id, mr.id)
        mr.update_attribute(:trady_id, @user.trady.id )

        mr.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Maintenance Scheduled - Awaiting Invoice")
        quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
        if quote_request
          #do nothing
        else
          QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
        end
        QuoteRequest.expire(mr.id)
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


        mr.action_status.update_columns(agent_status:"Awaiting Quote", trady_status:"Quote Requests")


      elsif params[:trady][:trady_request] == "Work Order"
        log = Log.create(maintenance_request_id:mr.id, action:"Work order sent to #{@user.trady.capitalize_company_name} by: ", name:name)
        TradyWorkOrderEmailWorker.perform_async(@user.trady.id, mr.id)
        mr.update_attribute(:trady_id, @user.trady.id )

        mr.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Maintenance Scheduled - Awaiting Invoice")
        quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
        if quote_request
          #do nothing
        else
          QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
        end
        QuoteRequest.expire(mr.id)
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
      if @trady.save(trady_params)
        
        @user = User.create(email:params[:trady][:email],password:SecureRandom.hex(5))
        @trady.update_attribute(:user_id, @user.id)
        @user.reload
        role = Role.new(user_id:@user.id)
        @trady.roles << role
        role.save

        Skill.create(trady_id:@trady.id, skill:mr.service_type )
        
       

        if params[:trady][:trady_request] == "Quote"
          log = Log.create(maintenance_request_id:mr.id, action:"Quote request sent to #{@trady.capitalize_company_name} by: ", name:name)
          
          TradyEmailWorker.perform_async(@trady.id,mr.id)
          TradyStatus.create(maintenance_request_id:mr.id,status:"Quote Requested")
          quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
          TenantQuoteRequestedNotificationEmailWorker.perform_async(mr.id,@trady.id)
          if quote_request
            #do nothing
          else
            QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
          end

          mr.action_status.update_columns(agent_status:"Awaiting Quote", trady_status:"Quote Requests") 

        elsif params[:trady][:trady_request] == "Work Order"
          log = Log.create(maintenance_request_id:mr.id, action:"Work Order sent to #{@trady.capitalize_company_name} by: ", name:name)
          
          TradyWorkOrderEmailWorker.perform_async(@trady.id, mr.id)
          mr.update_attribute(:trady_id, @trady.id )

          mr.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Maintenance Scheduled - Awaiting Invoice")

          quote_request = QuoteRequest.where(:trady_id=>@trady.id, :maintenance_request_id=>mr.id).first
          if quote_request
            #do nothing
          else
            QuoteRequest.create(trady_id:@trady.id, maintenance_request_id:mr.id)
          end
          QuoteRequest.expire(mr.id)



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
    @skills = @trady.skills
    @customer = @trady.customer_profile
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



  def update_skills
    trady = Trady.find_by(id:params[:trady_id])
    if params[:skill]
      new_skills= params[:skill][:skill]
    end 
    if new_skills 
      current_skills = trady.services_provided
      #what was removed?
      removed_skills = current_skills - new_skills
      #what was added?
      added_skills = new_skills - current_skills

      removed_skills.each do |skill|
        Skill.where(trady_id: trady.id, skill: skill).destroy_all
      end 

      added_skills.each do |skill|
       Skill.create(trady_id:trady.id, skill:skill)
      end 
      
      respond_to do |format|
        format.json {render :json=>{message:"Your services have been updated, thank you.", skills:trady.skills}}
        format.html{render :edit}
      end

    else
      @skills = Trady.find_by(id:params[:trady_id]).skills.as_json
      
      
      respond_to do |format|
        format.json {render :json=>{errors:"Please choose at least one service from the list below, thank you."}}
        format.html{render :edit}
      end
    end 
  end

      
 

  private


  def jfmo_terms_and_conditions
    if current_user && current_user.logged_in_as("Trady") && current_user.trady.jfmo_participant == true && current_user.trady.customer_profile.nil?
      flash[:danger] = "Please accept the terms and conditions to continue."
      redirect_to  join_just_find_me_one_path(trady_id:current_user.trady.id)
    else 

      #do nothing 

    end 

  end


  def trady_params
    params.require(:trady).permit(:id,:user_id,:tradie_company_id,:name,:mobile,:email,:skill,:maintenance_request_id,:skill_required, :company_name, :trady_request)
    
  end


end 

  

         