class UploadedInvoicesController < ApplicationController
  before_action :require_login, only:[:show,:index]
  
  before_action(only:[:new,:create,:edit,:update,:show,:send_invoice]) {allow("Trady")}
  def new
    @file = UploadedInvoice.new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = @trady.id
    @quote_id = params[:quote_id]
    @trady_company = @trady.trady_company
    @trady_company_id = @trady_company.id
  end

  def create
    
    @file = UploadedInvoice.new(file_params)
    maintenance_request_id = params[:uploaded_invoice][:maintenance_request_id]
    trady_id = params[:uploaded_invoice][:trady_id]
    quote_id = params[:uploaded_invoice][:quote_id]
    invoice_type = params[:uploaded_invoice][:invoice_type]
    system_plan = params[:uploaded_invoice][:system_plan]
    
    if @file.save
      flash[:success] = "Thank you for uploading your invoice(s)"
      redirect_to uploaded_invoice_path(@file, maintenance_request_id:maintenance_request_id, trady_id:trady_id, quote_id:quote_id, invoice_type:invoice_type, system_plan:system_plan)
    else
      flash[:danger] = "Something went wrong."
      render :new
    end


    #new_single_invoice_path(trady_company_id:@trady_company_id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id) 
  end

  def edit

    @file = UploadedInvoice.find_by(id:params[:id])
    @trady = Trady.find_by(id:params[:trady_id])
    
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_company_id = @trady.trady_company
    @trady_id = @trady.id
    @quote_id = params[:quote_id]
    # @invoice_type = params[:invoice_type]
    # @system_plan = params[:system_plan]
    
  end

  def update
    @file = UploadedInvoice.find_by(id:params[:id])
    maintenance_request_id = params[:uploaded_invoice][:maintenance_request_id]
    trady_id = params[:uploaded_invoice][:trady_id]
    quote_id = params[:uploaded_invoice][:quote_id]
    invoice_type = params[:uploaded_invoice][:invoice_type]
    system_plan = params[:uploaded_invoice][:system_plan]

    if @file.update(file_params)
      flash[:success] = "Thank you for uploading your invoice(s)"
      redirect_to uploaded_invoice_path(@file, maintenance_request_id:maintenance_request_id, trady_id:trady_id, quote_id:quote_id, invoice_type:invoice_type, system_plan:system_plan)
    else
      flash[:danger] = "Something went wrong."
      render :new
    end

  end

  def show
    
    @pdf = UploadedInvoice.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @invoice_type = params[:invoice_type]
    @system_plan = params[:system_plan]

    
  end

  def send_invoice
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    AgentsMaintenanceRequestInvoiceWorker.perform_async(maintenance_request.id)
    maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", maintenance_request_status:"Completed")
    invoice = UploadedInvoice.find_by(id:params[:pdf_invoice_id])
    invoice.update_attribute(:delivery_status, true)
    Log.create(maintenance_request_id:@maintenance_request.id, action:"Invoice has been uploaded")

    redirect_to invoice_sent_success_path(maintenance_request_id: params[:maintenance_request_id], trady_id: params[:trady_id] )
  end
    
  

  private

  def file_params
    params.require(:uploaded_invoice).permit(:maintenance_request_id, :trady_id,{invoices: []})
  end

end 