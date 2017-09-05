class WorkOrdersController < ApplicationController
  def cancel_work_order
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.update_attribute(:trady_id, nil)
    log = Log.create(maintenance_request_id:maintenance_request.id, action:"Work order cancelled.")
    if current_user.logged_in_as("AgencyAdmin")
      
      redirect_to agency_admin_maintenance_request_path(maintenance_request)
    elsif current_user.logged_in_as("Agent")
      
      redirect_to agent_maintenance_request_path(maintenance_request)
    end 
  end

end 