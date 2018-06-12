class TradyServiceFeePaymentReceiptEmailWorker
  include Sidekiq::Worker

  def perform(receipt_id)
    
    receipt = Receipt.find_by(id:receipt_id)

    
    TradyMailer.trady_service_fee_payment_receipt(receipt).deliver
    

  end


  
end 
