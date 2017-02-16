class TradyRequestsInitialAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id,appointment_id, tenant_id, trady_id)

    appointment = Appointment.find_by(id:appointment_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    tenant = Tenant.find_by(id:tenant_id)
    trady = Trady.find_by(id:trady_id)
    TenantMailer.send_tenant_initial_appointment_request(maintenance_request,appointment, tenant, trady).deliver

  end
end 


