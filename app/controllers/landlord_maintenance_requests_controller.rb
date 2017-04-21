class LandlordMaintenanceRequestsController < ApplicationController

  def index
    if params[:sort_by_date] == "Newest to Oldest"
      @maintenance_requests = current_user.landlord.all_maintenance_requests.order('created_at DESC').paginate(:page => params[:page], :per_page => 3)
    else
      @maintenance_requests = current_user.landlord.all_maintenance_requests.order('created_at ASC').paginate(:page => params[:page], :per_page => 3)
    end
  end

  def show
    
  end

end 