class QuoteOptionsController < ApplicationController

  def show
    @maintenance_request= MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = @trady.id

  end

end 