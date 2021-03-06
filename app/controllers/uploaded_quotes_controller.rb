class UploadedQuotesController < ApplicationController 
  before_action :require_login
  before_action :require_role
  def new
    @file = UploadedQuote.new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = @trady.id
    @quote_id = params[:quote_id]
    @trady_company = @trady.trady_company
    @trady_company_id = @trady_company.id
  end

  def create
    
    @file = UploadedQuote.new(file_params)
    maintenance_request_id = params[:uploaded_quote][:maintenance_request_id]
    trady_id = params[:uploaded_quote][:trady_id]
    quote_id = params[:uploaded_quote][:quote_id]
    quote_type = params[:uploaded_quote][:quote_type]
    system_plan = params[:uploaded_quote][:system_plan]
    
    if @file.save
      flash[:success] = "Thank you for uploading your Quotes(s)"
      redirect_to uploaded_quote_path(@file, maintenance_request_id:maintenance_request_id, trady_id:trady_id, quote_id:quote_id, quote_type:quote_type, system_plan:system_plan)
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@file.errors}}
      end
    end


    #new_single_invoice_path(trady_company_id:@trady_company_id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id) 
  end

  def edit

    @file = UploadedQuote.find_by(id:params[:id])
    @trady = Trady.find_by(id:params[:trady_id])
    
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_company = @trady.trady_company
    @trady_id = @trady.id
    @quote_id = params[:quote_id]
    # @invoice_type = params[:invoice_type]
    # @system_plan = params[:system_plan]
    
  end

  def update
    @file = UploadedQuote.find_by(id:params[:id])
    maintenance_request_id = params[:uploaded_quote][:maintenance_request_id]
    trady_id = params[:uploaded_quote][:trady_id]
    quote_id = params[:uploaded_quote][:quote_id]
    quote_type = params[:uploaded_quote][:quote_type]
    system_plan = params[:uploaded_quote][:system_plan]

    if @file.update(file_params)
      flash[:success] = "Thank you for uploading your invoice(s)"
      redirect_to uploaded_quote_path(@file, maintenance_request_id:maintenance_request_id, trady_id:trady_id, quote_id:quote_id, quote_type:quote_type, system_plan:system_plan)
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@file.errors}}
      end
    end

  end

  def show
    
    @pdf = UploadedQuote.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @quote_type = params[:quote_type]
    @system_plan = params[:system_plan]

    
  end

  def send_quote
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    #AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
    #I HAVE TO ADD AN EMAIL TO THE AGENT WHEN A PDF QUOTE IS MADE
    maintenance_request.action_status.update_columns(agent_status:"Quote Received", action_category: "Action Required")
    quote = UploadedQuote.find_by(id:params[:pdf_quote_id])
    quote.update_attribute(:delivery_status, true)
     
    
    redirect_to uploaded_quote_sent_path(maintenance_request_id: params[:maintenance_request_id] )
  end


  def uploaded_quote_sent
    @maintenance_request = params[:maintenance_request_id]
  end
    
  

  private

  def file_params
    params.require(:uploaded_quote).permit(:maintenance_request_id, :trady_id,{quotes: []})
  end

end 