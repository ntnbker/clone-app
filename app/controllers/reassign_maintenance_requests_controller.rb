class ReassignMaintenanceRequestsController < ApplicationController 
  
  def reassign
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    user = User.find_by(email:params[:email])

    if user.has_role("AgencyAdmin") && user.has_role("Agent")
      maintenance_request.update_attribute(:agency_admin_id, user.agency_admin.id)
    elsif user.has_role("AgencyAdmin")
      
      maintenance_request.update_columns(agency_admin_id: user.agency_admin.id, agent_id: nil)
    elsif user.has_role("Agent")
      
      maintenance_request.update_columns(agent_id: user.agent.id, agency_admin_id: nil)
    end 
    NotifyAgentOfReassignedMaintenanceRequestEmailWorker.perform_async(maintenance_request.id, user.id)
    Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request has been reassigned.")
    if current_user.current_role("AgencyAdmin")
      flash[:success] = "You have reassigned that maintenance request." 
      redirect_to agency_admin_maintenance_requests_path
    elsif current_user.current_role("Agent")
      flash[:success] = "You have reassigned that maintenance request." 
      redirect_to agent_maintenance_requests_path
    end 
  end

end 