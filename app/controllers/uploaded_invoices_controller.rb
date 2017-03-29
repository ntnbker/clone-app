class UploadedInvoicesController < ApplicationController
  
  def new
    @file = UploadedInvoice.new


    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    
  end

  def create
    
    @file = UploadedInvoice.new(file_params)
    
    if @file.save
      flash[:success] = "Thank you for uploading your invoice(s)"
      redirect_to uploaded_invoice_path(@file)
    else
      flash[:danger] = "Something went wrong."
      render :new
    end
  end

  def show
    
  end

  private

  def file_params
    params.require(:uploaded_invoice).permit(:maintenance_request_id, :trady_id,{invoices: []})
  end

end 