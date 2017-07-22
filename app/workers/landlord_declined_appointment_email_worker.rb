class LandlordDeclinedAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id,maintenance_request_id)
    
   
    tenant = Tenant.find_by(id:tenant_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    TenantMailer.landlord_declined_appointment(tenant,maintenance_request).deliver
    

  end

end 
