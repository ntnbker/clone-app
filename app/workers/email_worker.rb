class EmailWorker 
  include Sidekiq::Worker

  def perform(object_id)
    
    maintenance_request = MaintenanceRequest.find(object_id)
    #AppMailer.send_welcome_email(user).deliver

    ApplicationMailer.send_maintenance_request_email(maintenance_request).deliver

    ApplicationMailer.send_access_contacts_mr_email(maintenance_request).deliver
    
    ApplicationMailer.send_agent_maintenance_request_email(maintenance_request).deliver
  end
end 


