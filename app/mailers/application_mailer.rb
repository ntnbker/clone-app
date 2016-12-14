class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  # layout 'mailer'
  def send_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    mail from:"ron@email.com", to:maintenance_request.email, subject:"Hi #{maintenance_request.name} your maintenance request is now being processed"
  end

  def send_access_contacts_mr_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    access_contacts = @maintenance_request.access_contacts
    email_array = []

    access_contacts.each do |f|
      email_array.push(f.email)

    end 
    
    
    mail(from:"ron@email.com", to:email_array, subject: "New comment on the Subvisual blog")

  end

  def send_agent_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    mail from:"ron@email.com", to:maintenance_request.agent_email, subject:"Hi #{maintenance_request.agent_name} a maintenance request has been made"
  end

end

