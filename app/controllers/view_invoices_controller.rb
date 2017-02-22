class ViewInvoicesController < ApplicationController
  def show
    @invoice = Invoice.find_by(id:params[:invoice_id])
  end

end 