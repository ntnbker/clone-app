class InvoicesController < ApplicationController

  def edit_trady_company_invoice
    @trady_company = TradyCompany.find_by(id:params[:trady_company_id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
  end

  def update_trady_company_invoice
    binding.pry
    @trady_company = TradyCompany.find_by(id:params[:trady_company][:trady_company_id])
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @trady.update_attribute(:email,params[:trady_company][:email]) 
    @trady.user.update_attribute(:email,params[:trady_company][:email]) 
    @maintenance_request_id = params[:trady_company][:maintenance_request_id]
    @trady_id = params[:trady_company][:trady_id]
    @quote_id = params[:trady_company][:quote_id]
    if @trady_company.update(trady_company_params)
      flash[:success] = "You have succesfully edited your company"
      redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id])  
    else
      flash[:danger] = "Sorry something went wrong please fill in the required fields"
      render :edit
    end 

  end

  def new
    #below we are using the info from the quote to create a new invoice.
    #the quote instance grabs all the info and fills out the form
    #including all the items. When submitted however it will create a new invoice object
    @quote = Quote.find_by(id:params[:quote_id])
    @invoice = Invoice.new
    @invoice.invoice_items.build
    @maintenance_request_id= params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
  end

  def create
    
    @invoice = Invoice.new(invoice_params)
    
    @total = @invoice.calculate_total(params[:invoice][:invoice_items_attributes])
    binding.pry
    if @invoice.save
      @invoice.update_attribute(:amount,@total)
      
      redirect_to invoice_path(@invoice,maintenance_request_id:params[:invoice][:maintenance_request_id], trady_id:params[:invoice][:trady_id])
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:quote][:trady_id]
      @maintenance_request_id= params[:quote][:maintenance_request_id]
      render :new 
    end
  end

  def show
    @invoice = Invoice.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
    @trady_id = params[:trady_id] 
  end

  private
    def trady_company_params
      params.require(:trady_company).permit(:bank_account_number,:bsb_number,:account_name,:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email)
    end

    def invoice_params
    params.require(:invoice).permit(:id, :trady_id, :maintenance_request_id,invoice_items_attributes:[:id,:amount,:item_description, :_destroy])
  end

end 

