

class AgentSubmittedMaintenanceRequestEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)

    
    AgentMailer.agent_submitted_maintenance_request_email(maintenance_request).deliver
    

  end


  
end 
