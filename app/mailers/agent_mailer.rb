require 'digest/sha2'
class AgentMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
  default from: 'info@sm.maintenanceapp.com.au'

  def send_agent_quote(maintenance_request, quote)
    @maintenance_request = maintenance_request
    @property= @maintenance_request.property
    @quote = quote
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail(to:email, subject:"Quote recieved from #{@quote.trady.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
    
  end

  def send_maintenance_request_invoice(maintenance_request)
    @maintenance_request = maintenance_request
    @trady = @maintenance_request.trady
    @property = @maintenance_request.property
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      
    end

    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail(to:@user.email, subject:"Invoice recieved from #{@trady.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def request_quote_email(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail(to:email, subject:"Quote requested by landlord #{@landlord.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def quote_has_been_approved_email(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    @trady = @maintenance_request.trady
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    mail(to:email, subject:"Quote approved for - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_agent_about_landlord_message(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    mail(to:email, subject:"New message from landlord #{@landlord.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_agent_about_tenant_message(maintenance_request)
    @maintenance_request = maintenance_request
    @tenant = @maintenance_request.tenants.first
    @property = @maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    mail(to:email, subject:"New message from tenant #{@tenant.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_agent_about_trady_message(maintenance_request)
    @maintenance_request = maintenance_request
    @trady = @maintenance_request.trady
    @property = @maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    mail(to:email, subject:"New message from trady #{@trady.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_agent_about_trady_quote_message(maintenance_request, quote)
    @maintenance_request = maintenance_request
    # @trady = @maintenance_request.trady

    @property = @maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    @quote = quote
    @trady = @quote.trady
    mail(to:email, subject:"Quote comment from trady #{@quote.trady.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def agent_submitted_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    # @trady = @maintenance_request.trady
    @tenant = maintenance_request.tenants.first
    @property = @maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    
    mail(to:email, subject:"Your maintenance request submitted on behalf of #{@tenant.name.capitalize} - #{@property.property_address}, sent on #{Date.today}")
  end

  def maintenance_request_reassigned_email(maintenance_request,user)
    @maintenance_request = maintenance_request
    @property = maintenance_request.property
    @tenant = maintenance_request.tenants.first
    @user = user
    if user.has_role("AgencyAdmin") && user.has_role("Agent")
      
      maintenance_request.update_attribute(:agency_admin_id, user.agency_admin.id)
    elsif user.has_role("AgencyAdmin")
      
      maintenance_request.update_columns(agency_admin_id: user.agency_admin.id, agent_id: nil)
    elsif user.has_role("Agent")
      
      maintenance_request.update_columns(agent_id: user.agent.id, agency_admin_id: nil)
    end 



    mail(to:user.email, subject:"A maintenance request has been reassiged to you for - #{@property.property_address}, sent on #{Date.today}")
  end

  def remind_agent_of_invoice_payment(maintenance_request)
    @maintenance_request = maintenance_request
    @trady = @maintenance_request.trady
    if @maintenance_request.agent
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email

      
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end 

    mail(to:email, subject:"Invoice Payment Reminder, sent on #{Date.today}")
  end

  def agency_admin_outstanding_maintenance_requests(agency_admin, new_count, quote_requested_count, quote_recieved_count, new_invoice_count, cancelled_work_order_count, deferred_maintenance_request_count, send_work_order_count)
    @agency_admin = agency_admin
    @new_count = new_count
    @send_work_order_count = send_work_order_count
    @quote_requested_count= quote_requested_count 
    @quote_recieved_count = quote_recieved_count
    @new_invoice_count = new_invoice_count
    @cancelled_work_order_count= cancelled_work_order_count
    @deferred_maintenance_request_count = deferred_maintenance_request_count
    email = agency_admin.email 
    

    mail(to:email, subject:"Outstanding Work, sent on #{Date.today}")
    ###WHAT YOU NEED TO DO IS MAKE THE TEMPLATE FOR THE EMAIL
    ### THEN YOU HAVE TO ADD THE CODE FOR THE SCHEDULER AND THEN RUN IT.
    

  end

  def agent_outstanding_maintenance_requests(agent, new_count, quote_requested_count, quote_recieved_count, new_invoice_count, cancelled_work_order_count, deferred_maintenance_request_count, send_work_order_count)
    @agent = agent
    @new_count = new_count
    @quote_requested_count= quote_requested_count 
    @quote_recieved_count = quote_recieved_count
    @new_invoice_count = new_invoice_count
    @cancelled_work_order_count= cancelled_work_order_count
    @deferred_maintenance_request_count = deferred_maintenance_request_count
    @send_work_order_count = send_work_order_count
    email = agent.email 
    

    mail(to:email, subject:"Outstanding Work, sent on #{Date.today}")
    ###WHAT YOU NEED TO DO IS MAKE THE TEMPLATE FOR THE EMAIL
    ### THEN YOU HAVE TO ADD THE CODE FOR THE SCHEDULER AND THEN RUN IT.
  end

  def notify_agent_about_trady_quote_request_message(maintenance_request,quote_request)
    @maintenance_request = maintenance_request
    # @trady = @maintenance_request.trady

    @property = @maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    @quote_request = quote_request
    @trady = @quote_request.trady
    mail(to:email, subject:"Quote comment from trady #{@quote_request.trady.capitalize_name} - #{@property.property_address}, sent on #{Date.today}")
  end

  def work_order_approved_by_landlord(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    @trady = @maintenance_request.trady
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    mail(to:email, subject:"Work order approved for - #{@property.property_address}, sent on #{Date.today}")
  end

  def notify_agent_about_landlord_deferring_maintenance(maintenance_request)
    @maintenance_request = maintenance_request

    @property = @maintenance_request.property
    @landlord = @property.landlord
    @trady = @maintenance_request.trady
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end

    # track user: @user
    mail(to:email, subject:"Landlord has deferred maintenance for - #{@property.property_address}, sent on #{Date.today}")
  end

  def void_invoice(maintenance_request, invoice)
    @maintenance_request = maintenance_request
    @invoice = invoice
    
    
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    
    
    mail(to:email, subject:"Invoice Void Do Not Pay. View Details")
  end

  def void_uploaded_invoice(maintenance_request, invoice)
    @maintenance_request = maintenance_request
    @invoice = invoice
    
    
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    
    
    mail(to:email, subject:"Invoice Void Do Not Pay. View Details")
  end


  def agent_notice_landlord_self_repair_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    @property = @maintenance_request.property
    
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    
    
    mail(to:email, subject:"The landlord has decided to resolve issue himself for property - #{@property.property_address}, sent on #{Date.today}")
  end

  def agent_notice_landlord_has_repaired_issue_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    @property = @maintenance_request.property
    
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    end
    
    mail(to:email, subject:"The landlord has resolved the issue himself for property - #{@property.property_address}, sent on #{Date.today}")
  end

  def agency_admin_new_maintenance_request_reminder(maintenance_request)
    @maintenance_request = maintenance_request
    
    @property = @maintenance_request.property
    @user = @maintenance_request.agency_admin.user
    email = @maintenance_request.agency_admin.email 
    
    
    mail(to:email, subject:"New maintenance request reminder for property - #{@property.property_address}, sent on #{Date.today}")
  end

  def agency_admin_quote_requested_reminder(maintenance_request)
    @maintenance_request = maintenance_request
    
    @property = @maintenance_request.property
    @user = @maintenance_request.agency_admin.user
    email = @maintenance_request.agency_admin.email 
    
    
    mail(to:email, subject:"Quote requested reminder for property - #{@property.property_address}, sent on #{Date.today}")
  end

end 

