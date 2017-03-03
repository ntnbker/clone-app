class MaintenanceRequestFiltersController < ApplicationController 
  
  def filtered_maintenance_requests 
    c = current_user
    p = params[:maintenance_request_filter]
    @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p).paginate(:page => params[:page])
  end 

end 