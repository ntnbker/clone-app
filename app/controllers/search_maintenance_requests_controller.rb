class SearchMaintenanceRequestsController < ApplicationController 

  def search_maintenance_request
    if params[:query]
      @maintenance_requests = MaintenanceRequest.search(params[:query]).records.to_a
    
    else
      @maintenance_requests = []

    end 
      
  end

end 