class AgentTexter
 include Rails.application.routes.url_helpers
  def self.notify_agent_about_new_maintenance_request_text(maintenance_request, url)
    @maintenance_request = maintenance_request
    @url = url
    if @maintenance_request.agency_admin
      agent = @maintenance_request.agency_admin
      phone = @maintenance_request.agency_admin.mobile_phone
      user = agent.user
      # url = "#{link_to 'View Maintenance Request', agency_admin_maintenance_request_url(@maintenance_request,user_id:user.id)}"
      text = "Hi Leon, this is a BJJ TEXT message from maintenance app. ITS WORKS lol to take a look please click this #{@url}"
    elsif @maintenance_request.agent 
      agent = @maintenance_request.agent
      phone = @maintenance_request.agent.mobile_phone
      user = agent.user
      # url = "#{link_to 'View Maintenance Request', agent_maintenance_request_url(@maintenance_request,user_id:user.id)}"
      text = "Hi #{agent.name.capitalize}, you have a new maintenance request to take a look please click this #{@url}"
    end 


        

    @twilio_number = "+"+ENV['TWILIO_NUMBER']
    
    @client = Twilio::REST::Client.new ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN']
    #time_str = ((self.time).localtime).strftime("%I:%M%p on %b. %d, %Y")
    # reminder = "Hi #{appointment.name}. Just a reminder that you have an appointment coming up at #{appointment.appointment_time}."
    message = @client.account.messages.create(
      :from => @twilio_number,
      :to => phone,
      :body => text,
    )
    
  end







end 