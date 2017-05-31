class InvoicesController < ApplicationController

  

  def new

    #this quote instance variable is for front end to add the values into the form using JS
    @quote = Quote.find_by(id:params[:quote_id])
    
    if @quote
      @quote_items = @quote.quote_items
    elsif @quote == nil
      @quote_items =""
    end 

    @maintenance_request_id= params[:maintenance_request_id]
    @maintenance_request = MaintenanceRequest.find_by(id:@maintenance_request_id)

    @trady = Trady.find_by(id:params[:trady_id])
    
    @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
    
    @invoice_type = params[:invoice_type]




    # @invoice = Invoice.new

    @ledger = Ledger.new
    @ledger.invoices.build
    @ledger.invoices.each do |invoice|
      invoice.invoice_items.build

    end 
   
    
    
  end

  def create
    
    
    @ledger = Ledger.new(ledger_params)
    
    @invoice_type = params[:ledger][:invoice_type]
    
    if @ledger.save
      
      
      @ledger.invoices.each {|invoice| invoice.save_total }
      #must be after invoices method because all invoices calculated first then add them up for grandtotal
      @ledger.save_grand_total
      
      # @invoice.update_attribute(:amount,@total)
      



      redirect_to invoice_path(@ledger,maintenance_request_id:params[:ledger][:maintenance_request_id], trady_id:params[:ledger][:trady_id], quote_id:params[:ledger][:quote_id],invoice_type:@invoice_type, system_plan:"Invoice" )
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:ledger][:trady_id]
      @maintenance_request_id= params[:ledger][:maintenance_request_id]
      @quote = Quote.find_by(id:params[:ledger][:quote_id])
      render :new 
    end
  end

  def show
    @ledger = Ledger.find_by(id:params[:id])
    @invoice_type = params[:invoice_type]
    @system_plan = params[:system_plan]
    #@invoice = Invoice.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
    # @ledger = @maintenance_request.ledger
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = params[:trady_id] 
    @quote_id = params[:quote_id]
  end

  def edit
    @ledger = Ledger.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @quote = Quote.find_by(id:params[:quote_id])
    @invoice_type = params[:invoice_type]
    if @quote
      @quote_items = @quote.quote_items
    else
      @quote_items =""
    end 
    
    @trady_company = @trady.trady_company
  end

  def update
    
    
    @ledger = Ledger.find_by(id:params[:ledger][:ledger_id])
    #@total = @invoice.calculate_total(params[:invoice][:invoice_items_attributes])
    @maintenance_request_id = params[:ledger][:maintenance_request_id]

    @trady = Trady.find_by(id:params[:ledger][:trady_id])
    @invoice_type = params[:ledger][:invoice_type]
    @trady_company = @trady.trady_company

    if @ledger.update(ledger_params)
      # @invoice.update_attribute(:amount,@total)
      @ledger.invoices.each {|invoice| invoice.save_total }
      #must be after invoices method because all invoices calculated first then add them up for grandtotal
      @ledger.save_grand_total
      flash[:success] = "Your Invoice has been updated"
      redirect_to invoice_path(@ledger,maintenance_request_id:params[:ledger][:maintenance_request_id], trady_id:params[:ledger][:trady_id], quote_id:params[:ledger][:quote_id], invoice_type:@invoice_type)
    else
      flash[:danger] = "Sorry Something went wrong "
      render :edit
    end 
    
  end

  def new_additional_invoice
    @maintenance_request_id= params[:maintenance_request_id]
    @maintenance_request = MaintenanceRequest.find_by(id:@maintenance_request_id)
    @ledger_id = @maintenance_request.ledger.id
    @trady = Trady.find_by(id:params[:trady_id])
    
    @invoice = Invoice.new
    @invoice.invoice_items.build
  end

  def create_additional_invoice
    @invoice = Invoice.new(invoice_params)
    @maintenance_request = MaintenanceRequest.find_by(id:params[:invoice][:maintenance_request_id])
    
    if @invoice.save
      @invoice.calculate_invoice_items_totals
      @invoice.save_total
      @invoice.calculate_tax
      @invoice.set_ledger_id
      @invoice.add_single_invoice_to_ledger
      
      redirect_to invoice_path(@invoice,maintenance_request_id:params[:invoice][:maintenance_request_id], trady_id:params[:invoice][:trady_id], quote_id:params[:invoice][:quote_id])
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:invoice][:trady_id]
      @maintenance_request_id= params[:invoice][:maintenance_request_id]
      
      render :new 
    end
  end

  def send_invoice
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    AgentsMaintenanceRequestInvoiceWorker.perform_async(maintenance_request.id)
    maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", trady_status:"Awaiting Payment")
    # maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", maintenance_request_status:"Completed", trady_status:"Awaiting Payment")
    Log.create(maintenance_request_id:maintenance_request.id, action:"Invoice created")
    maintenance_request.invoices.each do |invoice|
      invoice.update_attribute(:delivery_status, true)
    end 

    redirect_to invoice_sent_success_path(maintenance_request_id: params[:maintenance_request_id], trady_id: params[:trady_id] )

    
  end

  def invoice_sent_success
    
    @maintenance_request_id = params[:maintenance_request_id]

    @trady_id = params[:trady_id]
    #this is an empty controller that just shows the template witha success mark and button to the home page. 
  end





  private
    def trady_company_params
      params.require(:trady_company).permit(:bank_account_number,:bsb_number,:account_name,:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email,:trady_company_id, :quote_id, :invoice_type, :pdf_file_id, :ledger_id)
    end

    def invoice_params
    params.require(:invoice).permit(:id, :trady_id,:quote_id ,:maintenance_request_id,:tax,:payment_installment_amount,:prepaid_or_postpaid, invoice_items_attributes:[:id,:amount,:item_description, :_destroy, :pricing_type, :hours])
    end

    def ledger_params
    params.require(:ledger).permit( :id, :trady_company_id,  :grand_total, :trady_id,:quote_id ,:maintenance_request_id, invoices_attributes:[ :id,:trady_id,:quote_id ,:maintenance_request_id,:amount,:tax,:due_date,:_destroy ,invoice_items_attributes:[:id,:amount,:item_description, :_destroy, :pricing_type, :hours]])
    end

end 

