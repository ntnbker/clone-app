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
    @property =@maintenance_request.property
    @appointment = appointment_object
    @landlord = landlord_object
    @tenant = tenant_object
    @user = @landlord.user
    track user: @user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@landlord.email, subject:"Change appointment request by tenant #{@tenant.name.capitalize}- #{@property.property_address}")
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @property =@maintenance_request.property
    @landlord = landlord_object
    @tenant = tenant_object
    track user: @landlord.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(from:"ron@email.com",to:@landlord.email, subject:"Appointment confirmed by tenant #{@tenant.name.capitalize}- #{@property.property_address}")
  end

  def tenant_cancelled_landlord_appointment_email(landlord_object)
    @landlord = landlord_object
    mail(from:"ron@email.com",to:@landlord.email, subject:"Appointment Cancelled")
  end

  def tenant_declined_landlord_appointment_email(landlord_object)
    @landlord = landlord_object
    mail(from:"ron@email.com",to:@landlord.email, subject:"Appointment Time Declined")
  end


  def quote_has_been_approved_email(maintenance_request_object)
    @landlord = maintenance_request_object.property.landlord
    @maintenance_request = maintenance_request_object
    @property =@maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    mail(from:"ron@email.com",to:@landlord.email, subject:"Work order sent by AgencyName - PropertyAddress")
  end

  def notify_landlord_about_message(maintenance_request_object)
    @landlord = maintenance_request_object.property.landlord
    @maintenance_request = maintenance_request_object
    @property =@maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 

    mail(from:"ron@email.com",to:@landlord.email, subject:"Message received from #{@agent.company_name.capitalize} - #{@property.property_address}
")
  end
  

end 