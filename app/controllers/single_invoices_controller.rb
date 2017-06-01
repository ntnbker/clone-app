# class SingleInvoicesController < ApplicationController 
#   def new
#     @maintenance_request_id= params[:maintenance_request_id]
#     @maintenance_request = MaintenanceRequest.find_by(id:@maintenance_request_id)
#     @ledger_id = @maintenance_request.ledger.id
#     @trady = Trady.find_by(id:params[:trady_id])
#     @invoice = Invoice.new
#     @invoice.invoice_items.build
#   end

#   def create
#     @invoice = Invoice.new(invoice_params)
#     @maintenance_request = MaintenanceRequest.find_by(id:params[:invoice][:maintenance_request_id])
    
#     if @invoice.save
#       @invoice.calculate_invoice_items_totals
#       @invoice.save_total
#       @invoice.calculate_tax
#       @invoice.set_ledger_id
#       @invoice.recalculate_ledger
#       redirect_to single_invoice_path(@invoice,maintenance_request_id:params[:invoice][:maintenance_request_id], trady_id:params[:invoice][:trady_id], quote_id:params[:invoice][:quote_id])
#     else
#       flash[:danger] = "Please Fill in a Minumum of one item"
#       @trady_id = params[:invoice][:trady_id]
#       @maintenance_request_id= params[:invoice][:maintenance_request_id]
#       render :new 
#     end
#   end
  
#   def show 
    
#     @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
#     @invoice = Invoice.find_by(id: params[:id])
#     @trady_id = params[:trady_id] 
#     @quote_id = params[:quote_id]
#   end
  
#   def edit
#     @invoice = Invoice.find_by(id:params[:id])
#     @maintenance_request_id = params[:maintenance_request_id]
#     @trady = Trady.find_by(id:params[:trady_id])
#     # @quote = Quote.find_by(id:params[:quote_id])
#     # if @quote
#     #   @quote_items = @quote.quote_items
#     # else
#     #   @quote_items =""
#     # end 
#     # @trady_company = @trady.trady_company
#   end

#   def update

#     @invoice = Invoice.find_by(id:params[:invoice][:id])
#     @maintenance_request = MaintenanceRequest.find_by(id:params[:invoice][:maintenance_request_id])
    
#     if @invoice.update(invoice_params)
#       @invoice.calculate_invoice_items_totals
#       @invoice.save_total
#       @invoice.calculate_tax
#       @invoice.set_ledger_id
#       @invoice.recalculate_ledger
     
      
#       redirect_to single_invoice_path(@invoice,maintenance_request_id:params[:invoice][:maintenance_request_id], trady_id:params[:invoice][:trady_id], quote_id:params[:invoice][:quote_id])
#     else
#       flash[:danger] = "Please Fill in a Minumum of one item"
#       @trady_id = params[:invoice][:trady_id]
#       @maintenance_request_id= params[:invoice][:maintenance_request_id]
      
#       render :new 
#     end
#   end


#   def send_single_invoice
    
#     maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
#     @invoice = Invoice.find_by(id:params[:invoice_id])
#     @invoice.update_attribute(:delivery_status, true)
#     AgentsMaintenanceRequestInvoiceWorker.perform_async(maintenance_request.id)
#     maintenance_request.action_status.update_columns(agent_status:"New Invoice", action_category:"Action Required", maintenance_request_status:"Completed")
#     redirect_to invoice_sent_success_path(maintenance_request_id: params[:maintenance_request_id], trady_id: params[:trady_id] )

    
   
#   end

#   private

#   def invoice_params
#     params.require(:invoice).permit(:id, :trady_id,:quote_id ,:maintenance_request_id,:tax,:payment_installment_amount,:prepaid_or_postpaid, invoice_items_attributes:[:id,:amount,:item_description, :_destroy, :pricing_type, :hours])
#     end

  
# end 