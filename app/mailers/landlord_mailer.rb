class LandlordMailer < ActionMailer::Base
  default from: 'info@mg.maintenanceapp.com.au'
  def send_landlord_maintenance_request(maintenance_request,landlord)
    track user: landlord.user
    track extra: {maintenance_request_id:maintenance_request.id}
    @maintenance_request = maintenance_request
    @property =@maintenance_request.property
    @landlord = landlord
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 

    mail to:landlord.email, subject:"Landlord instructions required - #{@property.property_address}"
  end

  def send_landlord_quote(maintenance_request,landlord, quote)
    track user: landlord.user
    track extra: {maintenance_request_id:maintenance_request.id}
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = landlord
    @quote = quote
    @trady = @quote.trady
    mail to:landlord.email, subject:"Quote received - #{@property.property_address}"
    
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
    mail(to:@landlord.email, subject:"Change appointment request by tenant #{@tenant.name.capitalize}- #{@property.property_address}")
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, landlord_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @property =@maintenance_request.property
    @landlord = landlord_object
    @tenant = tenant_object
    track user: @landlord.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@landlord.email, subject:"Appointment confirmed by tenant #{@tenant.name.capitalize}- #{@property.property_address}")
  end

  def tenant_cancelled_landlord_appointment_email(landlord_object,tenant_object,maintenance_request_object)
    @landlord = landlord_object
    @tenant = tenant_object
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    mail(to:@landlord.email, subject:"Cancelled appointment by tenant - #{@property.property_address}")
  end

  def tenant_declined_landlord_appointment_email(landlord_object,tenant_object,maintenance_request_object,appointment_object)
    @landlord = landlord_object
    @tenant = tenant_object
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @appointment = appointment_object
    mail(to:@landlord.email, subject:"Appointment declined by tenant #{@tenant.name.capitalize} - #{@property.property_address}")
  end


  def quote_has_been_approved_email(maintenance_request_object)
    @landlord = maintenance_request_object.property.landlord
    @maintenance_request = maintenance_request_object
    @property =@maintenance_request.property
    @trady = @maintenance_request.trady
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    mail(to:@landlord.email, subject:"Work order sent by #{@agency.company_name.capitalize} - #{@property.property_address}")
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

    mail(to:@landlord.email, subject:"Message received from #{@agency.company_name.capitalize} - #{@property.property_address}
")
  end
  

end 