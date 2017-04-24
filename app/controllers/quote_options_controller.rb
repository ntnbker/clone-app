class QuoteOptionsController < ApplicationController

  def show
    @maintenance_request= MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @trady_id = params[:trady_id]
  end

end 