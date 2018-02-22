class TradyPaymentRegistrationController < ApplicationController 

  def new
    @dates = Date::MONTHNAMES.compact.each_with_index.map{ |name, index| ["#{index+1} - #{name}", index+1] }
  end

  def create
    # Amount in cents
  

  customer = Stripe::Customer.create(
    :email => params[:stripeEmail],
    :source  => params[:stripeToken]
  )

  

rescue Stripe::CardError => e
  flash[:error] = e.message
  redirect_to new_charge_path
  end

end 