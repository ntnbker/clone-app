class AgentMailer < ActionMailer::Base

  

  def send_agent_quote(maintenance_request, quote)
    @maintenance_request = maintenance_request
    
    @quote = quote
    if @maintenance_request.agent == nil
      email = @maintenance_request.agency_admin.email 
    elsif @maintenance_request.agency_admin == nil
      email = @maintenance_request.agent.email
    end
      


    mail from:"ron@email.com", to:email, subject:"Hi A quote has been submitted"
    
  end

end 

