class AgentMailer < ActionMailer::Base

  def send_agent_quote(maintenance_request, quote)
    @maintenance_request = maintenance_request
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

    mail from:"ron@email.com", to:email, subject:"Hi A quote has been submitted"
    
  end

  def send_maintenance_request_invoice(maintenance_request)
     @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      
    end

    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail from:"ron@email.com", to:@user.email, subject:"Maintenance Request Invoice"
  end

  def request_quote_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail from:"ron@email.com", to:email, subject:"Hi the landlord has requested a quote for a maintenance job"
  end

  def quote_has_been_approved_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail from:"ron@email.com", to:email, subject:"Quote has been approved for a maintenance job."
  end

  def notify_agent_about_landlord_message(maintenance_request)
    @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail from:"ron@email.com", to:email, subject:"A landlord has sent you a message."
  end

  def notify_agent_about_tenant_message(maintenance_request)
    @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail from:"ron@email.com", to:email, subject:"A tenant has sent you a message."
  end

  def notify_agent_about_trady_message(maintenance_request)
    @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    # track user: @user
    mail from:"ron@email.com", to:email, subject:"A trady has sent you a message."
  end

end 

