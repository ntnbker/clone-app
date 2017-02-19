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
    track user: @landlord.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@landlord.email, subject:"New Appointment Time Requested")
  end

  

end 