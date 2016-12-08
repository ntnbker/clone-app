class MaintenanceRequestsController < ApplicationController
  before_action :require_login
  load_and_authorize_resource
  
  def new
    
    
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
     
    

  end

  def create
    
    @customer_input = Query.find_by(id:session[:customer_input])
    @maintenance_request = MaintenanceRequest.new(maintenance_request_params)
    
    if @maintenance_request.valid?
      @maintenance_request.agent_id = current_user.role.roleable_id
      @maintenance_request.save
      # @customer_input.update(maintenance_request_id:@maintenance_request.id)
      redirect_to agency_admin_maintenance_requests_path(current_user.role.roleable_id)
      flash[:notice]= "Thank You"
    else
      flash[:notice]= "something went wrong"
      render :new
      
    end 
    
  end


  private

  def maintenance_request_params
    params.require(:maintenance_request).permit(:name,:email,:mobile,:maintenance_heading,:agent_id,:tenant_id,:tradie_id,:maintenance_description,:image,:availability,:access_contact,availabilities_attributes:[:id,:maintenance_request_id,:date,:start_time,:finish_time,:available_only_by_appointment,:_destroy],access_contacts_attributes: [:id,:maintenance_request_id,:relation,:name,:email,:mobile,:_destroy])
  end

  # def agent_user
  #   @agent = Agent.find_by(id:current_user.role.roleable_id)
  #   authorize! :new, @agent
  #   authorize! :create, @agent
  # end

end 