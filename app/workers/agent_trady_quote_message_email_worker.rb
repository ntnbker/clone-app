
class AgentTradyQuoteMessageEmailWorker


  include Sidekiq::Worker

  def perform(maintenance_request_id,quote_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    quote = Quote.find_by(id:quote_id)
    
    AgentMailer.notify_agent_about_trady_quote_message(maintenance_request,quote).deliver
    

  end


  
end 
