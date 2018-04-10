


class AgentInvoiceVoidEmailWorker


  include Sidekiq::Worker

  def perform(maintenance_request_id, invoice_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    invoice = Invoice.find_by(id:invoice_id)
    
    AgentMailer.void_invoice(maintenance_request, invoice).deliver
    

  end


  
end 
