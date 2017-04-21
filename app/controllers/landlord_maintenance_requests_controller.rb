class LandlordMaintenanceRequestsController < ApplicationController

  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.landlord.order_maintenance_request_by_descending.paginate(:page => params[:page], :per_page => 3)
    else
      @maintenance_requests = current_user.landlord.order_maintenance_request_by_ascending.paginate(:page => params[:page], :per_page => 3)
    end
  end

  def show
    
  end

end 