class TradiesController < ApplicationController 

  def trady_information
    @your_int = 123
    gon.your_int = @your_int


    @trady = Trady.find_by(id:params[:trady_id])
    name = @trady.name
    gon.trady_name = name
    
    respond_to do |format|
      format.js

    end 
  end

  def create
    
    @user = User.find_by(email:params[:trady][:email])
    @trady = Trady.new(trady_params)
    mr = MaintenanceRequest.find_by(id:params[:trady][:maintenance_request_id])
    
    if mr.agent == nil  
      name = "#{mr.agency_admin.first_name}" + " #{mr.agency_admin.last_name}"
    elsif mr.agency_admin == nil  
      name = "#{mr.agent.name}" + " #{mr.agent.last_name}"
    end



    if mr.agency_admin != nil
      if mr.agency_admin.agency.tradies !=nil
        @all_tradies = mr.agency_admin.agency.tradies.where(:skill=>mr.service_type) 
      else 
        @all_tradies= []
      end 
    end 

    if mr.agent != nil
      if mr.agent.agency.tradies !=nil 
        @all_tradies = mr.agent.agency.tradies.where(:skill=>mr.service_type) 
      else 
        @all_tradies= []
      end
    end 


    if @user && @user.trady?
      
      respond_to do |format|
        
        #format.js{render layout: false, content_type: 'text/javascript'}
        format.json{render json:@all_tradies}
      end 

      agency_admin = mr.agency_admin
      agent = mr.agent
      if agency_admin == nil
        @agency = agent.agency
      elsif agent == nil
        @agency = agency_admin.agency
      end
      if AgencyTrady.where(:agency_id=>@agency.id, :trady_id => @user.trady.id).present? 
        #do nothing
      else
        AgencyTrady.create(agency_id:@agency.id,trady_id:@user.trady.id)
      end
        
      

      if params[:trady][:trady_request] == "Quote"
        TradyEmailWorker.perform_async(@user.trady.id,mr.id)
        Log.create(maintenance_request_id:mr.id, action:"Quote Requested", name:name)
        # TradyStatus.create(maintenance_request_id:mr.id,status:"Quote Requested")
        quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
        if quote_request
          #do nothing
        else
          QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
        end 

        
      elsif params[:trady][:trady_request] == "Work Order"
        Log.create(maintenance_request_id:mr.id, action:"Work Order Requested", name:name)
        TradyWorkOrderEmailWorker.perform_async(@user.trady.id, mr.id)
        mr.update_attribute(:trady_id, @user.trady.id )
      end 

      mr.action_status.update_attribute(:agent_status,"Awaiting Tradie Initiation")
         
    else
      respond_to do |format|
          if @trady.valid?
            
            @user = User.create(email:params[:trady][:email],password:SecureRandom.hex(5))
            @trady.user_id = @user.id
            @trady.skill = params[:trady][:skill_required]
            role = Role.create(user_id:@user.id)
            @trady.roles << role
            @trady.save

            agency_admin = mr.agency_admin
            agent = mr.agent
            if agency_admin == nil
              @agency = agent.agency
            elsif agent == nil
              @agency = agency_admin.agency
            end
                
            if params[:trady][:trady_request] == "Quote"
              Log.create(maintenance_request_id:mr.id, action:"Quote Requested", name:name)
              TradyEmailWorker.perform_async(@user.trady.id,mr.id)
              TradyStatus.create(maintenance_request_id:mr.id,status:"Quote Requested")
              quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
              if quote_request
                #do nothing
              else
                QuoteRequest.create(trady_id:@user.trady.id, maintenance_request_id:mr.id)
              end 
            elsif params[:trady][:trady_request] == "Work Order"
              Log.create(maintenance_request_id:mr.id, action:"Work Order Requested", name:name)
              TradyWorkOrderEmailWorker.perform_async(@user.trady.id, mr.id)
              mr.update_attribute(:trady_id, @user.trady.id )
            end 

            mr.action_status.update_attribute(:agent_status,"Awaiting Tradie Initiation")
            AgencyTrady.create(agency_id:@agency.id,trady_id:@trady.id)

            format.json{render json:@all_tradies}
          else
            
            format.json {render json:@trady.errors}
            
          end
        end
    end
 
      


  end 

      
 

  private

  def trady_params
    params.require(:trady).permit(:id,:user_id,:tradie_company_id,:name,:mobile,:email,:skill,:maintenance_request_id,:skill_required, :company_name, :trady_request)
    
  end


end 

# format.html {render "agent_maintenance_requests/show.html.haml", :success =>"Your message was sent FUCK THIS SHIT"}  
#         format.js{render layout: false, content_type: 'text/javascript'}

  

         