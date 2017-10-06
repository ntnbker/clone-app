
class TradyAgentMessageEmailWorker

  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    
    TradyMailer.notify_picked_trady_about_message(maintenance_request).deliver
    

  end

end 
