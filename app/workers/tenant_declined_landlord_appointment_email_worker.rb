class TenantDeclinedLandlordAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(landlord_id,tenant_id,maintenance_request_id,appointment_id)
    tenant = Tenant.find_by(id:tenant_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    landlord = Landlord.find_by(id:landlord_id)
    appointment = Appointment.find_by(id:appointment_id)
    LandlordMailer.tenant_declined_landlord_appointment_email(landlord,tenant,maintenance_request,appointment).deliver
  end
end 