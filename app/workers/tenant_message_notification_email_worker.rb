class TenantMessageNotificationEmailWorker 
  include Sidekiq::Worker

  def perform(object_id)
    
    maintenance_request = MaintenanceRequest.find(object_id)
   
    ApplicationMailer.message_notification_email(maintenance_request).deliver
    

  end


  
end 
