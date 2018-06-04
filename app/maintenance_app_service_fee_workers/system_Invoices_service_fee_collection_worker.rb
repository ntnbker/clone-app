require 'sidekiq-scheduler'
require "stripe"

class SystemInvoicesServiceFeeCollectionWorker
  include Sidekiq::Worker

  def perform
    

    # Run code if the date is 3 days more than when the last time this code ran 

    # Grab all invoices that have delivery_status = true and mapp_payment_status = Outstanding
    # and come from trady that are customers with customer profiles
    ReceiptProcessor.prepare_receipts
    
    Stripe.api_key = ENV["SECRET_KEY"]
      
    receipts = Receipt.where(paid:false).where("total > ?", 0)




    receipts.each do |receipt|
          customer_id = receipt.trady.customer_profile.customer_id
          amount_in_pennies = receipt.total.to_f * 100
          amount  = amount_in_pennies.to_i
      begin
        # Use Stripe's library to make requests...

        charge = Stripe::Charge.create(
          :amount => amount,
          :currency => "aud",
          :customer => customer_id, 
          :description => "MaintenanceApp service fee charge."
        )
        if charge["paid"] == true
          receipt.update_attribute(:paid, true)
          receipt.mark_as_paid
          #send an email about this charge to the trady
        end 

        rescue Stripe::CardError => e
          # Since it's a decline, Stripe::CardError will be caught
          body = e.json_body
          err  = body[:error]
          TradyPaymentError.create(trady_id:receipt.trady.id ,charge_id:err[:charge], message:err[:message], http_status:e.http_status,error_type:err[:type], error_code:err[:code])
          #WE NEED TO SEND AN EMAIL HERE. OR WE CAN JUST LIST THE ERRORS THAT WE GET ON A VIEW FOR US

        rescue Stripe::RateLimitError => e
          # Too many requests made to the API too quickly
          puts "Too many requests made to the API too quickly"
        rescue Stripe::InvalidRequestError => e
          puts "Invalid parameters were supplied to Stripe's API"
        rescue Stripe::AuthenticationError => e
          puts "Authentication with Stripe's API failed"
          puts "(maybe you changed API keys recently)"
        rescue Stripe::APIConnectionError => e
          puts "Network communication with Stripe failed"
        rescue Stripe::StripeError => e
          puts "There was something wrong with stripe"
          # Display a very generic error to the user, and maybe send
          # yourself an email
        rescue => e
          # Something else happened, completely unrelated to Stripe
      end
    end 





  
  end 
end 



          




