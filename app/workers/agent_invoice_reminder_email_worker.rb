

class AgentInvoiceReminderEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)

    
    AgentMailer.remind_agent_of_invoice_payment(maintenance_request).deliver
    

  end


  
end 
