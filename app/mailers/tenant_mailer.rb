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

  
  def alternative_appointment_picked_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @trady = trady_object
    @tenant = tenant_object
    @user = @tenant.user
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@tenant.email, subject:"New Appointment Time Requested")
  end

  def send_tenant_initial_landlord_appointment_request(maintenance_request,appointment, tenant, landlord)

    @appointment = appointment
    @maintenance_request = maintenance_request
    @tenant = tenant
    @landlord = landlord
    track user: tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail from:"ron@email.com", to:tenant.email, subject:"Hi #{tenant.full_name} an appointment time has been made"
  end

  def alternative_landlord_appointment_picked_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    @user = @tenant.user
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@tenant.email, subject:"New Appointment Time Requested")
  end

  def appointment_accepted_by_landlord_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@tenant.email, subject:"Hi your appointment time was accepted")
  end

  def trady_cancelled_appointment_email(tenant_object)
    
    @tenant = tenant_object
    mail(from:"ron@email.com",to:@tenant.email, subject:"Appointment Cancelled")
  end

  def trady_declined_appointment_email(tenant_object)
    @tenant = tenant_object
    mail(from:"ron@email.com",to:@tenant.email, subject:"Appointment Declined")
  end

  def landlord_cancelled_appointment(tenant_object)
    @tenant = tenant_object
    mail(from:"ron@email.com",to:@tenant.email, subject:"Appointment Cancelled")
  end

  def landlord_declined_appointment(tenant_object)
    @tenant = tenant_object
    mail(from:"ron@email.com",to:@tenant.email, subject:"Appointment Declined")
  end
  
  

end 