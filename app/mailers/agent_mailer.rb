class AgentMailer < ActionMailer::Base

  def send_agent_quote(maintenance_request, quote)
    @maintenance_request = maintenance_request
    @quote = quote
    if @maintenance_request.agent == nil
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail from:"ron@email.com", to:email, subject:"Hi A quote has been submitted"
    
  end

  def send_maintenance_request_invoice(maintenance_request)
     @maintenance_request = maintenance_request
    
    if @maintenance_request.agent == nil
      user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    end

    track user: user
    track extra: {maintenance_request_id:maintenance_request.id}

    mail from:"ron@email.com", to:email, subject:"Maintenance Request Invoice"
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

end 

