require 'digest/sha2'
class TradyMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
  default from: 'info@sm.maintenanceapp.com.au'

  def request_quote_email(trady_object, maintenance_request_object)
    @trady = trady_object
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"Quote request from#{@agency.company_name.capitalize}- #{@property.property_address}, sent on #{Date.today}")
  end

  def approved_quote_email(quote_object,trady_object, maintenance_request_object)
    @quote = quote_object
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    @trady = trady_object
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
    end 


    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"Work Order from #{@agency.company_name.capitalize}- #{@property.property_address}, sent on #{Date.today}")
  end

  def job_cancelled_email(trady_object, maintenance_request_object)
    @maintenance_request = maintenance_request_object
    @trady = trady_object
    @property = @maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
    end 
    mail(to:@trady.email, subject:"Job Cancelled by #{@agency.company_name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def quote_declined_email(quote_object,trady_object, maintenance_request_object)
    @quote = quote_object
    @maintenance_request = maintenance_request_object
    @trady = trady_object
    mail(to:@trady.email, subject:"Quote Declined")
  end

  def appointment_accepted_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @property = @maintenance_request.property
    @trady = trady_object
    @tenant = tenant_object
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
    end 
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"Appointment confirmed by tenant #{@tenant.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end


  def alternative_appointment_picked_email(maintenance_request_object,appointment_object, trady_object, tenant_object)
    @maintenance_request = maintenance_request_object
    @appointment = appointment_object
    @property = @maintenance_request.property
    @trady = trady_object
    @tenant = tenant_object
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:" New appointment request by tenant #{@tenant.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def work_order_email(trady_object, maintenance_request_object)
    @maintenance_request = maintenance_request_object
    @property = @maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
    end 
        
    @trady = trady_object
    track user: @trady.user
    track extra: {maintenance_request_id:@maintenance_request.id}
    mail(to:@trady.email, subject:"Work Order from #{@agency.company_name.capitalize}- #{@property.property_address} (#{@maintenance_request.work_order_number}), sent on #{Date.today}")
  end

  def tenant_cancelled_appointment_email(trady_object,maintenance_request_object)
    @trady = trady_object
    @maintenance_request = maintenance_request_object
    @tenant = @maintenance_request.tenants.first
    @property = @maintenance_request.property
    mail(to:@trady.email, subject:"Cancelled appointment by tenant - #{@property.property_address}, sent on #{Date.today}")
  end

  def tenant_declined_appointment_email(trady_object)
    @trady = trady_object
    mail(to:@trady.email, subject:"Appointment Declined, sent on #{Date.today}")
  end

  def notify_picked_trady_about_message(maintenance_request)
    @maintenance_request = maintenance_request
    @trady = @maintenance_request.trady
    @property = @maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end  
    mail(to:@trady.email, subject:"Message received from #{@agency.company_name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_trady_about_quote_message(maintenance_request,quote)
    @maintenance_request = maintenance_request
    @quote = quote
    @trady = @quote.trady
    @property = @maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    mail(to:@trady.email, subject:"Question about quote from #{@agency.company_name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def reminder_awaiting_quote_request(maintenance_request, trady, property, quote_request)
    @maintenance_request = maintenance_request
    @quote_request = quote_request
    @trady = trady
    @property = property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    mail(to:@trady.email, subject:"Reminder for a requested quote from #{@agency.capitalize_company_name}- #{@property.property_address}, sent on #{Date.today}")
  end

  def reminder_work_order_assigned_appointment_required(maintenance_request, trady, property)
    @maintenance_request = maintenance_request
    
    @trady = trady
    @property = property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    mail(to:@trady.email, subject:"Reminder Work Order Approved from #{@agency.capitalize_company_name}- #{@property.property_address}, sent on #{Date.today}")
  end


  def reminder_trady_to_confirm_appointment(maintenance_request_object, trady_object, property,tenant_object)
    
    @maintenance_request = maintenance_request_object
    @property = property
    @trady = trady_object
    @tenant = tenant_object
    
    mail(to:@trady.email, subject:"Reminder New appointment requested by tenant #{@tenant.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def reminder_trady_to_submit_invoice(maintenance_request_object, trady_object, property)
    @maintenance_request = maintenance_request_object
    @property = property
    @trady = trady_object
    
    
    mail(to:@trady.email, subject:"Reminder Awaiting Invoice - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_trady_about_quote_request_message(maintenance_request,quote_request)
    @maintenance_request = maintenance_request
    @quote_request = quote_request
    @trady = @quote_request.trady
    @property = @maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end 
    mail(to:@trady.email, subject:"Question about quote from #{@agency.capitalize_company_name} - #{@property.property_address}, sent on #{Date.today}")
  end
  
end 

















