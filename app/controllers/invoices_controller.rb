class InvoicesController < ApplicationController

  def edit_trady_company_invoice
    @trady_company = TradyCompany.find_by(id:params[:trady_company_id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
  end

  def update_trady_company_invoice
    
    @trady_company = TradyCompany.find_by(id:params[:trady_company][:trady_company_id])
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @trady.update_attribute(:email,params[:trady_company][:email]) 
    @trady.user.update_attribute(:email,params[:trady_company][:email]) 
    @maintenance_request_id = params[:trady_company][:maintenance_request_id]
    @trady_id = params[:trady_company][:trady_id]
    @quote_id = params[:trady_company][:quote_id]
    @ledger = MaintenanceRequest.find_by(id:params[:trady_company][:maintenance_request_id]).ledger
    #@invoice = @trady.invoices.where(maintenance_request_id:@maintenance_request_id).first

    if @trady_company.update(trady_company_params)
      flash[:success] = "You have succesfully edited your company"
      
      if @ledger == nil
        #This used to be the if condition (@invoice == nil)
        redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id])  
      elsif @ledger != nil
        #This used to be the if condition(@invoice !=nil)
        redirect_to edit_invoice_path(@ledger.id, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id])
      end 

    else
      flash[:danger] = "Sorry something went wrong please fill in the required fields"
      render :edit
    end 

  end

  def new

    #this quote instance variable is for front end to add the values into the form using JS
    @quote = Quote.find_by(id:params[:quote_id])
    @quote_items = @quote.quote_items
    @maintenance_request_id= params[:maintenance_request_id]

    @trady = Trady.find_by(id:params[:trady_id])
    
    @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
    




    # @invoice = Invoice.new

    @ledger = Ledger.new
    @ledger.invoices.build
    @ledger.invoices.each do |invoice|
      invoice.invoice_items.build

    end 
   
    
    
  end

  def create
    

    @ledger = Ledger.new(ledger_params)
    
    
    if @ledger.save
      
      @ledger.invoices.each {|invoice| invoice.save_total }
      #must be after invoices method because all invoices calculated first then add them up for grandtotal
      @ledger.save_grand_total
      # @invoice.update_attribute(:amount,@total)
      
      redirect_to invoice_path(@ledger,maintenance_request_id:params[:ledger][:maintenance_request_id], trady_id:params[:ledger][:trady_id], quote_id:params[:ledger][:quote_id])
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:quote][:trady_id]
      @maintenance_request_id= params[:quote][:maintenance_request_id]
      @quote = Quote.find_by(id:params[:ledger][:quote_id])
      render :new 
    end
  end

  def show
    @ledger = Ledger.find_by(id:params[:id])
    #@invoice = Invoice.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
    @trady_id = params[:trady_id] 
    @quote_id = params[:quote_id]
  end

  def edit
    @ledger = Ledger.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @quote = Quote.find_by(id:params[:quote_id])
    @quote_items = @quote.quote_items
    
    @trady_company = @trady.trady_company
  end

  def update
    
    ledger_id = MaintenanceRequest.find_by(id:params[:ledger][:maintenance_request_id]).ledger.id
    @ledger = Ledger.find_by(id:ledger_id)
    #@total = @invoice.calculate_total(params[:invoice][:invoice_items_attributes])
    @maintenance_request_id = params[:ledger][:maintenance_request_id]

    @trady = Trady.find_by(id:params[:ledger][:trady_id])
    
    @trady_company = @trady.trady_company

    if @ledger.update(ledger_params)
      # @invoice.update_attribute(:amount,@total)
      @ledger.invoices.each {|invoice| invoice.save_total }
      #must be after invoices method because all invoices calculated first then add them up for grandtotal
      @ledger.save_grand_total
      flash[:success] = "Your Invoice has been updated"
      redirect_to invoice_path(@ledger,maintenance_request_id:params[:ledger][:maintenance_request_id], trady_id:params[:ledger][:trady_id], quote_id:params[:ledger][:quote_id])
    else
      flash[:danger] = "Sorry Something went wrong "
      render :edit
    end 
    
  end

  def send_invoice
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    AgentsMaintenanceRequestInvoiceWorker.perform_async(maintenance_request.id)
    maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", maintenance_request_status:"Completed")
    redirect_to invoice_sent_success_path
  end

  def invoice_sent_success
    #this is an empty controller that just shows the template witha success mark and button to the home page. 
  end





  private
    def trady_company_params
      params.require(:trady_company).permit(:bank_account_number,:bsb_number,:account_name,:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email)
    end

    def invoice_params
    params.require(:invoice).permit(:id, :trady_id,:quote_id ,:maintenance_request_id,:tax,:payment_installment_amount,:prepaid_or_postpaid, invoice_items_attributes:[:id,:amount,:item_description, :_destroy, :pricing_type, :hours])
    end

    def ledger_params
    params.require(:ledger).permit( :id, :grand_total, :trady_id,:quote_id ,:maintenance_request_id, invoices_attributes:[ :id,:trady_id,:quote_id ,:maintenance_request_id,:amount,:tax, invoice_items_attributes:[:id,:amount,:item_description, :_destroy, :pricing_type, :hours]])
    end

end 

