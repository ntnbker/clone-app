class AgentsMaintenanceRequestInvoiceWorker 
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    agent = maintenance_request.agent
    agency_admin = maintenance_request.agency_admin
    
    
    AgentMailer.send_maintenance_request_invoice(maintenance_request).deliver
  end


  
end 
