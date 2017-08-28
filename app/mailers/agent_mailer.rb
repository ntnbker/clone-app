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

    mail(to:email, subject:"Quote recieved from #{@quote.trady.name.capitalize} - #{@property.property_address}")
    
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

    mail(to:@user.email, subject:"Invoice recieved from #{@trady.name.capitalize} - #{@property.property_address}")
  end

  def request_quote_email(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail(to:email, subject:"Quote requested by landlord #{@landlord.name.capitalize} - #{@property.property_address}")
  end

  def quote_has_been_approved_email(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    @trady = @maintenance_request.trady
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail(to:email, subject:"Quote approved for - #{@property.property_address}.")
  end

  def notify_agent_about_landlord_message(maintenance_request)
    @maintenance_request = maintenance_request
    @property = @maintenance_request.property
    @landlord = @property.landlord
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail(to:email, subject:"New message from landlord #{@landlord.name.capitalize} - #{@property.property_address}.")
  end

  def notify_agent_about_tenant_message(maintenance_request)
    @maintenance_request = maintenance_request
    @tenant = @maintenance_request.tenants.first
    @property = @maintenance_request.property
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail(to:email, subject:"New message from tenant #{@tenant.name.capitalize} - #{@property.property_address}.")
  end

  def notify_agent_about_trady_message(maintenance_request)
    @maintenance_request = maintenance_request
    @trady = @maintenance_request.trady
    @property = @maintenance_request.property
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail(to:email, subject:"New message from trady #{@trady.name.capitalize} - #{@property.property_address}.")
  end

  def notify_agent_about_trady_quote_message(maintenance_request, quote)
    @maintenance_request = maintenance_request
    # @trady = @maintenance_request.trady

    @property = @maintenance_request.property
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end
    @quote = quote
    @trady = @quote.trady
    mail(to:email, subject:"Quote comment from trady #{@quote.trady.name.capitalize} - #{@property.property_address}.")
  end

  def agent_submitted_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    # @trady = @maintenance_request.trady
    @tenant = maintenance_request.tenants.first
    @property = @maintenance_request.property
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end
    
    mail(to:email, subject:"Your maintenance request submitted on behalf of #{@tenant.name.capitalize} - #{@property.property_address}.")
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



    mail(to:user.email, subject:"A maintenance request has been reassiged to you for - #{@property.property_address}.")
  end

end 

