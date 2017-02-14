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

  
  

end 