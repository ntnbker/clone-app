class LandlordDeclinedAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id,maintenance_request_id,appointment_id)
    
   
    tenant = Tenant.find_by(id:tenant_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    appointment = Appointment.find_by(id:appointment_id)
    TenantMailer.landlord_declined_appointment(tenant,maintenance_request,appointment).deliver
    

  end

end 
