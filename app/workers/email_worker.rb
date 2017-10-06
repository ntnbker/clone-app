class EmailWorker 
  include Sidekiq::Worker

  def perform(object_id)
    
    maintenance_request = MaintenanceRequest.find(object_id)
    ApplicationMailer.send_agency_admin_or_agent_maintenance_request_email(maintenance_request).deliver
    ApplicationMailer.send_tenant_access_contacts_mr_email(maintenance_request).deliver

  end


  
end 


