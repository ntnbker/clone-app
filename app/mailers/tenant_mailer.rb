class TenantMailer < ActionMailer::Base

  def send_tenant_initial_appointment_request(maintenance_request,appointment, tenant, trady)

    @appointment = appointment
    @maintenance_request = maintenance_request
    @tenant = tenant
    @trady = trady
    track user: tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail from:"ron@email.com", to:tenant.email, subject:"Hi #{tenant.full_name} an appointment time has been made"
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @trady = trady_object
    @tenant = tenant_object
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@tenant.email, subject:"Hi your appointment time was accepted")
  end

  
  

end 