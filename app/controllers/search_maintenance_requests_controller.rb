class SearchMaintenanceRequestsController < ApplicationController 

  def search_maintenance_request
    
    if params[:query]
      @maintenance_requests = MaintenanceRequest.search(params[:query], page: params[:page], per_page: 20)
    
    else
      @maintenance_requests = []

    end 
      
  end

end 