class DownloadPdfsController < ApplicationController
  before_action :require_login, only:[:edit,:update]
  before_action :require_role


  def show


    respond_to do |format|
      format.pdf { send_invoice_pdf }
    end
  end
 
  private
 
  def invoice_pdf
    invoice = Invoice.find(params[:invoice_id])
    InvoicePdf.new(invoice)
    
  end
 
  def send_invoice_pdf
    send_file invoice_pdf.to_pdf,
      filename: invoice_pdf.filename,
      type: "application/pdf",
      disposition: "attachment"
  end

end 



