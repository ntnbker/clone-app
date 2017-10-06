
class TradyAgentQuoteMessageEmailWorker

  include Sidekiq::Worker

  def perform(maintenance_request_id,quote_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    quote = Quote.find_by(id:quote_id)
    TradyMailer.notify_trady_about_quote_message(maintenance_request,quote).deliver
    

  end

end 
