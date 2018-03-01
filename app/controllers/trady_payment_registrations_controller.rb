class TradyPaymentRegistrationsController < ApplicationController 

  # def new
  #   #@dates = Date::MONTHNAMES.compact.each_with_index.map{ |name, index| ["#{index+1} - #{name}", index+1] }
  

  #   @ledger_id = params[:ledger_id]
  #   #@ledger = Ledger.find_by(id:params[:ledger_id])
  #   @trady_company_id = params[:trady_company_id]
  #   @maintenance_request_id = params[:maintenance_request_id]
  #   @trady_id = params[:trady_id]
  #   @quote_id = params[:quote_id]
  #   @invoice_type = params[:invoice_type]
  #   @system_plan = params[:system_plan]


  # end

  def create
    trady = Trady.find_by(id:params[:trady_id])



    if trady.customer_profile.customer_id

      customer = Stripe::Customer.create(
        :email => params[:stripeEmail],
        :source  => params[:stripeToken]
      )
      trady.customer_profile.update_attribute(:customer_id, customer.id)

    else

      customer = Stripe::Customer.create(
        :email => params[:stripeEmail],
        :source  => params[:stripeToken]
      )

      CustomerProfile.create(customer_id:customer.id, trady_id:trady.id)

    end 

    redirect_to invoice_path(id:params[:ledger_id],maintenance_request_id:params[:maintenance_request_id], trady_id:params[:trady_id], quote_id:params[:quote_id],invoice_type:params[:invoice_type])

  end 
    

end 