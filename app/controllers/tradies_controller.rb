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
    binding.pry
    @user = User.find_by(email:params[:trady][:email])
    @trady = Trady.new(trady_params)
    if @user && @user.trady?
      respond_to do |format|
        format.html {render "maintenance_requests/show.html.haml"}  
        format.js{render layout: false, content_type: 'text/javascript'}
        mr_agency_admin = MaintenanceRequest.find_by(id:params[:trady][:maintenance_request_id]).agent
        mr_agent = MaintenanceRequest.find_by(id:params[:trady][:maintenance_request_id]).agency_admin
        if mr_agency_admin == nil
          @agency = mr_agent.agency
        elsif mr_agent == nil
          @agency = mr_agency_admin.agency
        end
        if AgencyTrady.where(:agency_id=>@agency.id, :trady_id => @user.trady.id).present? 
          #do nothing
        else
          AgencyTrady.create(agency_id:@agency.id,trady_id:@user.trady.id)
        end
      end
        
         
    else
      respond_to do |format|
          if @trady.valid?
            format.html {render "maintenance_requests/show.html.haml", :success =>"Your message was sent FUCK THIS SHIT"}  
            format.js {render layout: false, content_type: 'text/javascript'}
            user = User.create(email:params[:trady][:email],password:SecureRandom.hex(5))
            @trady.user_id = user.id
            @trady.skill = params[:trady][:skill_required]
            role = Role.create(user_id:user.id)
            @trady.roles << role
            @trady.save

            mr_agency_admin = MaintenanceRequest.find_by(id:params[:trady][:maintenance_request_id]).agent
            mr_agent = MaintenanceRequest.find_by(id:params[:trady][:maintenance_request_id]).agency_admin
            if mr_agency_admin == nil
              @agency = mr_agent.agency
            elsif mr_agent == nil
              @agency = mr_agency_admin.agency
            end 
                

            binding.pry
            AgencyTrady.create(agency_id:@agency.id,trady_id:@trady.id)
            
          else
            format.html { render "maintenance_requests/show.html.haml" }
            format.js {}
            
          end
        end
    end
 
      


  end 

      
 

  private

  def trady_params
    params.require(:trady).permit(:id,:user_id,:tradie_company_id,:name,:mobile,:email,:skill,:maintenance_request_id,:skill_required)
    
  end


end 

# format.html {render "agent_maintenance_requests/show.html.haml", :success =>"Your message was sent FUCK THIS SHIT"}  
#         format.js{render layout: false, content_type: 'text/javascript'}

  

         