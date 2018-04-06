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
      # @file.update_attribute(:url, @file.pdf_url)
      redirect_to uploaded_invoice_path(@file, maintenance_request_id:maintenance_request_id, trady_id:trady_id, quote_id:quote_id, invoice_type:invoice_type, system_plan:system_plan)
    else
      # flash[:danger] = "Something went wrong."
      # render :new

      respond_to do |format|
        format.json {render :json=>{:error=>@file.errors}}
        
      end
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
      # flash[:danger] = "Something went wrong."
      # render :new
      respond_to do |format|
        format.json {render :json=>{:error=>@file.errors}}
      end
    end

  end

  def show

    @pdf = UploadedInvoice.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @invoice_type = params[:invoice_type]
    @system_plan = params[:system_plan]
    @trady = Trady.find_by(id:@trady_id)
    @customer = @trady.customer_profile.as_json

  end

  def send_invoice

    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    AgentsMaintenanceRequestInvoiceWorker.perform_async(maintenance_request.id)
    maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", maintenance_request_status:"Completed")
    invoice = UploadedInvoice.find_by(id:params[:pdf_invoice_id])
    invoice.update_attribute(:delivery_status, true)
    Log.create(maintenance_request_id:maintenance_request.id, action:"Invoice has been uploaded")

    redirect_to invoice_sent_success_path(maintenance_request_id: params[:maintenance_request_id], trady_id: params[:trady_id] )
  end

  def void_invoice
    uploaded_invoice = UploadedInvoice.find_by(id:params[:uploaded_invoice_id])
    #user = User.find_by(id:params[:current_user_id])
    
    if !params[:message].empty?
      uploaded_invoice.update_attribute(:active,false)
      
      maintenance_request = invoice.maintenance_request
      if current_user.logged_in_as("Trady")
        #send email to the agent saying invoice is void dont pay that one.
        #AgentInvoiceVoidEmailWorker.perform_async(maintenance_request.id)
        person = "Agent" 
      elsif current_user.logged_in_as("AgencyAdmin")
        #send email to the trady saying invoice has been void and they requite another 
        person = "Tradie"
      elsif current_user.logged_in_as("Agent")
        #send email to the trady saying invoice has been void and they requite another 
        person = "Tradie"
      end
    else 
      error = "Message is empty, please submit a a reason for voiding the invoice. Thank you for your time."
    end 
        
      respond_to do |format|
        format.json {render :json=>{message:"You have voided this invoice. An email has been send to the #{person} to inform them that this invoice has been voided and no payment is required towards that invoice.", errors:error}}
      end 
  end



  private

  def file_params
    params.require(:uploaded_invoice).permit(:maintenance_request_id,:total_invoice_amount,:due_date ,:service_fee,:trady_id,:pdf,{invoices: []})
  end

end
