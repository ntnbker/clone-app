class ActionStatusesController < ApplicationController
  def job_complete
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.action_status.update_columns(maintenance_request_status: "Completed",agent_status:"Job Completed", action_category:"Completed")
  end

end