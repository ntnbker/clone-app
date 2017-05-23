class MaintenanceRequestFiltersController < ApplicationController 
  
  def filtered_maintenance_requests 
    c = current_user
    p = params[:maintenance_request_filter]
    # .paginate(:page => params[:page])
    # @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p)
    

    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p).order('created_at DESC')
    else
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p).order('created_at ASC')
    end

    @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:maintenance_request_image=>{}, :property=>{} })
    
    respond_to do |format|
      format.json {render json:@maintenance_requests_json}
      format.html
    end

  end 

end 