


class AgentTradyQuoteRequestMessageEmailWorker


  include Sidekiq::Worker

  def perform(maintenance_request_id,quote_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    quote_request = QuoteRequest.find_by(id:quote_id)
    AgentMailer.notify_agent_about_trady_quote_request_message(maintenance_request,quote_request).deliver
    

  end


  
end 
