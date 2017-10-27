require 'digest/sha2'
class TenantMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
  default from: 'info@sm.maintenanceapp.com.au'

  def send_tenant_initial_appointment_request(maintenance_request,appointment, tenant, trady)

    @appointment = appointment
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @tenant = tenant
    @trady = trady
    track user: tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail to:tenant.email, subject:"Appointment request by tradie, #{@trady.company_name.capitalize} - #{@property.property_address}"
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @appointment = appointment_object
    @trady = trady_object
    @tenant = tenant_object
    track user: @tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@tenant.email, subject:"Appointment confirmed by #{@trady.company_name.capitalize} - #{@property.property_address}")
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
    mail(to:@tenant.email, subject:"New appointment request by #{@trady.company_name.capitalize} - #{@property.property_address.capitalize}")
  end

  def send_tenant_initial_landlord_appointment_request(maintenance_request,appointment, tenant, landlord)

    @appointment = appointment
    @maintenance_request = maintenance_request
    @property = maintenance_request.property
    @tenant = tenant
    @landlord = landlord
    track user: tenant.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail to:tenant.email, subject:" Appointment request by Landlord, #{@landlord.name.capitalize} - #{@property.property_address}"
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

  def trady_cancelled_appointment_email(tenant_object,trady_object,maintenance_request_object)
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @tenant = tenant_object
    @trady = trady_object
    mail(to:@tenant.email, subject:"Cancelled appointment by #{@trady.company_name.capitalize} - #{@property.property_address}")
  end

  def trady_declined_appointment_email(tenant_object, trady_object, maintenance_request_object,appointment_object)
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @tenant = tenant_object
    @trady = trady_object
    @appointment = appointment_object
    mail(to:@tenant.email, subject:"Appointment declined by #{@trady.company_name.capitalize} - #{@property.property_address}")
  end

  def landlord_cancelled_appointment(tenant_object,maintenance_request_object)
    @tenant = tenant_object
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @landlord = @property.landlord
    mail(to:@tenant.email, subject:"Cancelled appointment by landlord, #{@landlord.name.capitalize}- #{@property.property_address}")
  end

  def landlord_declined_appointment(tenant_object,maintenance_request_object,appointment_object)
    @tenant = tenant_object
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @landlord = @property.landlord
    @appointment = appointment_object
    mail(to:@tenant.email, subject:"Appointment declined by landlord, #{@landlord.name.capitalize}- #{@property.property_address}")
  end

  def tenant_quote_requested_notification_email(maintenance_request,trady)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @tenant = @maintenance_request.tenants.first
    @trady = trady
    if @maintenance_request.agent
      @agent = @maintenance_request.agent
      @agency = @agent.agency
    elsif @maintenance_request.agency_admin
      @agency_admin = @maintenance_request.agency_admin
      @agency = @agency_admin.agency
    end
        
    mail(to:@tenant.email, subject:"Quote requested by #{@agency.company_name.capitalize} - #{@property.property_address}")
  end

  def tenant_quote_approved_notification_email(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    @trady = @maintenance_request.trady
    @tenant = @maintenance_request.tenants.first

    if @maintenance_request.agent
      @person = @maintenance_request.agent.name.capitalize

    elsif @maintenance_request.agency_admin
      @person = @maintenance_request.agency_admin.first_name.capitalize
    end 
        
        
    mail(to:@tenant.email, subject:"Quote Approved by Agent, #{@person} - #{@property.property_address}")
  end

  def tenant_maintenace_request_submitted_by_agent(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    
    @tenant = @maintenance_request.tenants.first

    @user = @tenant.user
    if @maintenance_request.agent
      @person = @maintenance_request.agent.name.capitalize

    elsif @maintenance_request.agency_admin
      @person = @maintenance_request.agency_admin.first_name.capitalize
    end     
        
    mail(to:@tenant.email, subject:"A maintenance request was submitted by your agent - #{@person} - #{@property.property_address}")
  end


  def reminder_tenant_to_confirm_appointment(maintenance_request_object, trady_object, property_object,tenant_object)
    @maintenance_request = maintenance_request_object
    
    @property = property_object
    @trady = trady_object
    @tenant = tenant_object
    @user = @tenant.user
    
    mail(to:@tenant.email, subject:"Reminder New appointment request by #{@trady.company_name.capitalize} - #{@property.property_address.capitalize}")
  end
  
  

end 