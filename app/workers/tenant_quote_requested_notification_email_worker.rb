


class TenantQuoteRequestedNotificationEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id,trady_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    trady = Trady.find_by(id:trady_id)
   TenantMailer.tenant_quote_requested_notification_email(maintenance_request,trady).deliver
    

  end


  
end 
