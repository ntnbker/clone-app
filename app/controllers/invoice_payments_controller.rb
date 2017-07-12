# class InvoicePaymentsController < ApplicationController

#   def edit

#     @invoice_payment = InvoicePayment.find_by(id:params[:id])
#     @invoice_id = params[:invoice_id]
#   end


#   def update
#     @invoice_payment = InvoicePayment.find_by(id:params[:id])
    
#     if @invoice_payment.update(invoice_payment_params)
#       flash[:success] = "You have updated the invoice payment amount"
#       redirect_to view_invoice_path(invoice_id:@invoice_payment.invoice.id)
#     else
#       flash[:danger] = "Something Went Wrong"
#       render :edit
#     end 
#   end


#   def create
    
#     invoice_payment = InvoicePayment.new(invoice_payment_params)        
    
#     if invoice_payment.save
#       flash[:success] = "You have submitted payment details"
#       invoice_payment.check_payment(params[:invoice_payment][:amount_paid])
#       redirect_to view_invoice_path(invoice_id:params[:invoice_payment][:invoice_id])
#     else
#       render "view_invoices/show"
#       flash[:danger] = "Please fill feilds below."
#     end 
#   end


#   private

#   def invoice_payment_params
#     params.require(:invoice_payment).permit(:invoice_id, :date, :amount_paid)
#   end
# end 