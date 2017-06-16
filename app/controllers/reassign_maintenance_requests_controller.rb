class ReassignMaintenanceRequestsController < ApplicationController 
  
  def reassign
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    user = User.find_by(email:params[:email])


    if the user is both an agent and agencyadmin then assign it to as an agencyadmin

      if they are only and agent then assign as agent 

        if they are only agency admin then assign to agency admin


    if user.has_role("AgencyAdmin") && user.has_role("Agent")
      maintenance_request.update_attribute(:agency_admin_id, user.agency_admin.id)
    elsif user.has_role("AgencyAdmin")
      maintenance_request.update_attribute(:agency_admin_id, user.agency_admin.id)
    elsif user.has_role("Agent")
      maintenance_request.update_attribute(:agent_id, user.agent.id)
    end 

    if current_user.current_role("AgencyAdmin")
      flash[:success] = "You have reassigned that maintenance request." 
      redirect_to agency_admin_maintenance_requests_path
    elsif current_user.current_role("Agent")
      flash[:success] = "You have reassigned that maintenance request." 
      redirect_to agent_maintenance_requests_path
    end 
  end

end 