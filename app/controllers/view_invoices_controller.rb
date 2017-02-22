class ViewInvoicesController < ApplicationController
  def show
    @invoice = Invoice.find_by(id:params[:invoice_id])
  end

  def print_invoice
    @invoice = Invoice.find_by(id:params[:id])
    @invoice.maintenance_request.action_status.update_attribute(:agent_status, "Pending Payment")
  end 
end 