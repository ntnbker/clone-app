class TradyInvoiceVoidEmailWorker

  include Sidekiq::Worker

  def perform(maintenance_request_id,invoice_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    invoice = Invoice.find_by(id:invoice_id)
    TradyMailer.agent_voided_invoice(maintenance_request,invoice).deliver
    

  end

end 
