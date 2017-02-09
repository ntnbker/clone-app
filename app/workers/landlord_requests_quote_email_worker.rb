class LandlordRequestsQuoteEmailWorker 
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    
    AgentMailer.request_quote_email(maintenance_request).deliver

  end


  
end 
