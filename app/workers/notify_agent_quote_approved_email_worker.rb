class NotifyAgentQuoteApprovedEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    
    AgentMailer.quote_has_been_approved_email(maintenance_request).deliver
    
    

  end
end 
