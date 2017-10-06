class PrintStatusesController < ApplicationController 
  def update
    invoice = Invoice.find(by:params[:invoice_id])
    invoice.update_attribute(:print_status, true)
  end

end 