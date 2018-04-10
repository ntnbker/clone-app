


class AgentUploadedInvoiceVoidEmailWorker


  include Sidekiq::Worker

  def perform(maintenance_request_id, uploaded_invoice_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    invoice = UploadedInvoice.find_by(id:uploaded_invoice_id)
    
    AgentMailer.void_uploaded_invoice(maintenance_request, invoice).deliver
    

  end


  
end 
