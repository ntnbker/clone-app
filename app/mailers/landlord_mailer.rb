class LandlordMailer < ActionMailer::Base

  def send_landlord_maintenance_request(maintenance_request,landlord)
    track user: landlord.user
    track extra: {maintenance_request_id:maintenance_request.id}
    @maintenance_request = maintenance_request
    @landlord = landlord
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a maintenance request has been made"
  end

  def send_landlord_quote(maintenance_request,landlord, quote)
    track user: landlord.user
    track extra: {maintenance_request_id:maintenance_request.id}
    @maintenance_request = maintenance_request
    @landlord = landlord
    @quote = quote
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a quote has been send for a maintenance request job"
    
  end

  def alternative_appointment_picked_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    @user = @landlord.user
    track user: @user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@landlord.email, subject:"New Appointment Time Requested")
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    track user: @landlord.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@landlord.email, subject:"Appointment Accepted")
  end

  def tenant_cancelled_landlord_appointment_email(landlord_object)
    @landlord = landlord_object
    mail(from:"ron@email.com",to:@landlord.email, subject:"Appointment Cancelled")
  end

  def tenant_declined_landlord_appointment_email(landlord_object)
    @landlord = landlord_object
    mail(from:"ron@email.com",to:@landlord.email, subject:"Appointment Cancelled")
  end


  def quote_has_been_approved_email(maintenance_request_object)
    @landlord = maintenance_request_object.property.landlord
    @maintenance_request = maintenance_request_object
    mail(from:"ron@email.com",to:@landlord.email, subject:"Quote for Maintenance Request Has Been Approved.")
  end
  

end 