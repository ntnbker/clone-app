class EmailWorker 
  include Sidekiq::Worker

  def perform(object_id)
    
    maintenance_request = MaintenanceRequest.find(object_id)

    #ApplicationMailer.send_maintenance_request_email(maintenance_request).deliver

    # ApplicationMailer.send_access_contacts_mr_email(maintenance_request).deliver
    
    ApplicationMailer.send_agency_admin_maintenance_request_email(maintenance_request).deliver

    #ApplicationMailer.send_none_registered_agency_maintenance_request_email(maintenance_request).deliver

    ApplicationMailer.send_tenant_access_contacts_mr_email(maintenance_request).deliver

  end
end 


