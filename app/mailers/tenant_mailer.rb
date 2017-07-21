class TenantMailer < ActionMailer::Base
  default from: 'info@maintenanceapp.com.au'
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
    @property = @maintenance_request
    @appointment = appointment_object
    @trady = trady_object
    @tenant = tenant_object
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@tenant.email, subject:"Appointment confirmed by #{@trady.trady_company.company_name.capitalize} - #{@property.property_address}")
  end

  
  def alternative_appointment_picked_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @property = @maintenance_request.property
    @trady = trady_object
    @tenant = tenant_object
    @user = @tenant.user
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@tenant.email, subject:"New appointment request by #{@trady.trady_company.company_name.capitalize} - #{@property.property_address.capitalize}")
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
    @property = @maintenance_request.property
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    @user = @tenant.user
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@tenant.email, subject:" New appointment request by landlord, #{@landlord.name.capitalize} - @property.property_address")
  end

  def appointment_accepted_by_landlord_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@tenant.email, subject:"Appointment confirmed by Landlord, #{@landlord.name.capitalize} - #{@property.property_address}")
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

  def tenant_quote_requested_notification_email(maintenance_request)
    @maintenance_request = maintenance_request
    @tenant = @maintenance_request.tenants.first
    mail(from:"ron@email.com",to:@tenant.email, subject:"Quote has been requested for your maintenance request")
  end

  def tenant_quote_approved_notification_email(maintenance_request)
    @maintenance_request = maintenance_request
    @tenant = @maintenance_request.tenants.first
    mail(from:"ron@email.com",to:@tenant.email, subject:"A Quote has been approved for your maintenance request")
  end
  
  

end 