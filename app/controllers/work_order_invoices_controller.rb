# class WorkOrderInvoicesController < ApplicationController

#   def new_trady_company_invoice
#     @trady_company = TradyCompany.new
#     @maintenance_request_id = params[:maintenance_request_id]
    
#     @trady = Trady.find_by(id:params[:trady_id])
#     @company = @trady.trady_company if !nil
  
#   end
  
#   def edit_trady_company_invoice
#     @trady_company = TradyCompany.find_by(id:params[:trady_company_id])
#     @maintenance_request_id = params[:maintenance_request_id]
#     @trady_id = params[:trady_id]
    
#   end

#     def update_trady_company_invoice
    
#     @trady_company = TradyCompany.find_by(id:params[:trady_company][:trady_company_id])
#     @trady = Trady.find_by(id:params[:trady_company][:trady_id])
#     @trady.update_attribute(:email,params[:trady_company][:email]) 
#     @trady.user.update_attribute(:email,params[:trady_company][:email]) 
#     @maintenance_request_id = params[:trady_company][:maintenance_request_id]
#     @trady_id = params[:trady_company][:trady_id]
#     @invoice = @trady.invoices.where(maintenance_request_id:@maintenance_request_id).first

#     if @trady_company.update(trady_company_params)
#       flash[:success] = "You have succesfully edited your company"

#       if @invoice == nil    
#         redirect_to new_work_order_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])  
#       elsif @invoice != nil
#         redirect_to edit_work_order_invoice_path(@invoice,maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])  
#       end 
#     else
#       flash[:danger] = "Sorry something went wrong please fill in the required fields"
#       render :edit_trady_company_invoice
#     end 

#   end

#   def  new 
    
#     @invoice = Invoice.new
#     @invoice.invoice_items.build
#     @maintenance_request_id= params[:maintenance_request_id]
#     @trady = Trady.find_by(id:params[:trady_id])
#     @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
#   end

#   def create
#     @invoice = Invoice.new(invoice_params)
    
#     @total = @invoice.calculate_total(params[:invoice][:invoice_items_attributes])
    
#     if @invoice.save
#       @invoice.update_columns(amount:@total)
#       redirect_to work_order_invoice_path(@invoice,maintenance_request_id:params[:invoice][:maintenance_request_id], trady_id:params[:invoice][:trady_id])
#     else
#       flash[:danger] = "Please Fill in a Minumum of one item"
#       @trady_id = params[:invoice][:trady_id]
#       @maintenance_request_id= params[:invoice][:maintenance_request_id]
#       render :new 
#     end
#   end

#   def show
#     @invoice = Invoice.find_by(id:params[:id])
#     @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
#     @trady_id = params[:trady_id] 
#   end

#   def edit
#     @invoice = Invoice.find_by(id:params[:id])
    
#     @maintenance_request_id = params[:maintenance_request_id]
#     @trady = Trady.find_by(id:params[:trady_id])
   
#     @trady_company = @trady.trady_company
#   end

#   def update_invoice
    
#     @invoice = Invoice.find_by(id:params[:invoice][:id])
#     @total = @invoice.calculate_total(params[:invoice][:invoice_items_attributes])
#     @maintenance_request_id = params[:invoice][:maintenance_request_id]
#     @trady = Trady.find_by(id:params[:invoice][:trady_id])
    
#     @trady_company = @trady.trady_company

#     if @invoice.update(invoice_params)
#       @invoice.update_attribute(:amount,@total)
#       flash[:success] = "Your Invoice has been updated"
#       redirect_to work_order_invoice_path(@invoice,maintenance_request_id:params[:invoice][:maintenance_request_id], trady_id:params[:invoice][:trady_id])
#     else
#       flash[:danger] = "Sorry Something went wrong "
#       render :edit
#     end 
#   end

#   def send_invoice
#     maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
#     AgentsMaintenanceRequestInvoiceWorker.perform_async(maintenance_request.id)
#     maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", maintenance_request_status:"Completed")
#   end

#   private
#     def trady_company_params
#       params.require(:trady_company).permit(:bank_account_number,:bsb_number,:account_name,:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email)
#     end

#     def invoice_params
#     params.require(:invoice).permit(:id, :trady_id,:maintenance_request_id,invoice_items_attributes:[:id,:amount,:item_description, :_destroy])
#     end

# end 