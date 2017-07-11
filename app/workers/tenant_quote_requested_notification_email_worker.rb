


class TenantQuoteRequestedNotificationEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
   
   TenantMailer.tenant_quote_requested_notification_email(maintenance_request).deliver
    

  end


  
end 
