class AgentTenantMessageEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)

    
    AgentMailer.notify_agent_about_tenant_message(maintenance_request).deliver
    

  end


  
end 
