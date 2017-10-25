class MaintenanceRequestFiltersController < ApplicationController 
  before_action :require_login

  def filtered_maintenance_requests 
    c = current_user
    p = params[:maintenance_request_filter]
    
    

    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p).order('created_at DESC')
    else
      @maintenance_requests = MaintenanceRequest.find_maintenance_requests(c, p).order('created_at ASC')
    end

    @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)
    respond_to do |format|
      format.json {render json:@maintenance_requests_json}
      format.html
    end

  end 




  def trady_filtered_maintenance_requests
    p = params[:maintenance_request_filter]
    t = params[:trady_id]
    binding.pry

    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = TradyMaintenanceRequest.filtered_trady_maintenance_requests(t, p).order('created_at DESC')
    else
      @maintenance_requests = TradyMaintenanceRequest.filtered_trady_maintenance_requests(t, p).order('created_at ASC')
    end

    @maintenance_requests_json = @maintenance_requests.as_json(:include=>{:property=>{}},methods: :get_image_urls)

    respond_to do |format|
      format.json {render json:@maintenance_requests_json}
      format.html
    end
  end 

end 