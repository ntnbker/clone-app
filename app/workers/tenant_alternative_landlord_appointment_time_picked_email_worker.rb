class TenantAlternativeLandlordAppointmentTimePickedEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id, appointment_id, landlord_id, tenant_id)
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    appointment = Appointment.find_by(id:appointment_id)
    landlord = Landlord.find_by(id:landlord_id)
    tenant = Tenant.find_by(id:tenant_id)
    TenantMailer.alternative_landlord_appointment_picked_email(maintenance_request,appointment, landlord, tenant).deliver
  end

end 
