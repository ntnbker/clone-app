class TenantCancelledLandlordAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(landlord_id,tenant_id,maintenance_request_id)
    tenant = Tenant.find_by(id:tenant_id)
    landlord = Landlord.find_by(id:landlord_id)
    maintenance_request =MaintenanceRequest.find_by(id:maintenance_request_id)
    LandlordMailer.tenant_cancelled_landlord_appointment_email(landlord,tenant,maintenance_request).deliver
  end
end 