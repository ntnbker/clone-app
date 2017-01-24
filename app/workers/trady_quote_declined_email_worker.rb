class TradyQuoteDeclinedEmailWorker
  include Sidekiq::Worker

  def perform(quote_id,trady_id,maintenance_request_id)
    quote = Quote.find_by(id:quote_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    trady = Trady.find_by(id:trady_id)
    TradyMailer.quote_declined_email(quote, trady,maintenance_request).deliver
    
  end
end 
