class UploadedInvoicesController < ApplicationController
  
  def new
    @upload_invoice = UploadedInvoice.new


    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @trady_company_id = params[:trady_company_id]  
  end

  def create
    
  end

end 