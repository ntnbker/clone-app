class TenantAlternativeAppointmentTimePickedEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id, appointment_id, trady_id, tenant_id)
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    appointment = Appointment.find_by(id:appointment_id)
    trady = Trady.find(trady_id)
    tenant = Tenant.find_by(id:tenant_id)
    TenantMailer.alternative_appointment_picked_email(maintenance_request,appointment, trady, tenant).deliver
  end

end 
