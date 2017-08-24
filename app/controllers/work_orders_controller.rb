class WorkOrdersContoller < ApplicationController
  def cancel_work_order
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.update_attribute(:trady_id, nil)
  end

end 