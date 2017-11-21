

class AgentLandlordDeferredMaintenanceEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)

    
    AgentMailer.notify_agent_about_landlord_deferring_maintenance(maintenance_request).deliver
    

  end


  
end 
