class MaintenanceRequestFiltersController < ApplicationController 
  
  def filtered_maintenance_requests 
    c = current_user
    p = params[:maintenance_request_filter]
    @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p).paginate(:page => params[:page])
    @maintenance_requests_json = MaintenanceRequest.find_maintenance_requests(c, p).as_json(:include=>{:maintenance_request_image=>{}, :property=>{} })

    respond_to do |format|
      format.json {render json:@maintenance_requests_json}
      format.html
    end

  end 

end 