class InvoiceOptionsController < ApplicationController


  def show
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])

    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @trady_company_id = params[:trady_company_id]
  end

end 