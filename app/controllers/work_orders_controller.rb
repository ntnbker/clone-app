class WorkOrdersController < ApplicationController
  def cancel_work_order
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.update_attribute(:trady_id, nil)
    log = Log.create(maintenance_request_id:maintenance_request.id, action:"Work order cancelled.")
    respond_to do |format|
      format.json {render :json=>{log:log}}
    end 
  end

end 