

class LandlordRequestsInitialAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id,appointment_id, tenant_id, landlord_id)

    appointment = Appointment.find_by(id:appointment_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    tenant = Tenant.find_by(id:tenant_id)
    landlord = maintenance_request.property.landlord
    TenantMailer.send_tenant_initial_landlord_appointment_request(maintenance_request,appointment, tenant, landlord).deliver

  end
end 


