class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  # layout 'mailer'
  # default from: 'notify@mysite.com'

  # def self.send_request(row)
  #   emails = ['email1@mysite.com', 'email2@another.com']

  #   emails.each do |email|
  #     new_request(email,row).deliver_now
  #     # or
  #     #new_request(email,row).deliver_later

  #   end
  # end

  # def new_request(email, row)
  #   @item = row

  #   mail(to: email, subject: 'New request')

  # end



  def send_maintenance_request_email(maintenance_request)
    # @maintenance_request = maintenance_request
    
    # mail from:"ron@email.com", to:maintenance_request.email, subject:"Hi #{maintenance_request.name} your maintenance request is now being processed"
  end

  def send_tenant_access_contacts_mr_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    tenants = @maintenance_request.tenants
    email_array = []

    tenants.each do |f|
      email_array.push(f.email)
    end 

    email_array.each do |email|
      user = User.find_by(email:email)
      
      ApplicationMailer.email_extra_tenant(maintenance_request,email,user.id, user.tenant.full_name).deliver
    end 
    
    
  end

  def send_agency_admin_maintenance_request_email(maintenance_request)
    
    @maintenance_request = maintenance_request
    if maintenance_request.agency_admin == nil
      email = maintenance_request.agent_email
    else
      email = maintenance_request.agency_admin.email
    end 
    
    mail from:"ron@email.com", to:email, subject:"Hi #{maintenance_request.agent_name} a maintenance request has been made"
  end


  def email_extra_tenant(maintenance_request, tenant_email, tenant_id, tenant_name)
    @maintenance_request = maintenance_request
    @tenant_name = tenant_name
    @tenant_id = tenant_id
    mail(from:"ron@email.com", to:tenant_email, subject: "Tenants Maintenance Request")
  end


  def tenant_message_notify_email(maintenance_request, tenant_email, tenant_id, tenant_name)
    @maintenance_request = maintenance_request
    @tenant_name = tenant_name
    @tenant_id = tenant_id
    mail(from:"ron@email.com", to:tenant_email, subject: "New Maintenance Request Message")
  end

  def message_notification_email(maintenance_request)
    @maintenance_request = maintenance_request
    
    tenants = @maintenance_request.tenants
    email_array = []

    tenants.each do |f|
      email_array.push(f.email)
    end 

    email_array.each do |email|
      user = User.find_by(email:email)
      
      ApplicationMailer.tenant_message_notify_email(maintenance_request,email,user.id, user.tenant.full_name).deliver
    end 
    
  end










 

end



