
class LandlordCancelledAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id,maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    tenant = Tenant.find_by(id:tenant_id)
    TenantMailer.landlord_cancelled_appointment(tenant,maintenance_request).deliver
    

  end

end 
