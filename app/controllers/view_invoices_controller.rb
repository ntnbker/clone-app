class ViewInvoicesController < ApplicationController
  def show
    @invoice = Invoice.find_by(id:params[:invoice_id])
    @trady = @invoice.maintenance_request.trady
    
  end

  def show_pdf

    @pdf = UploadedInvoice.find_by(id:params[:id])
    
  end

  def print_invoice
    @invoice = Invoice.find_by(id:params[:id])
    @invoice.maintenance_request.action_status.update_attribute(:agent_status, "Pending Payment")
  end 
end 