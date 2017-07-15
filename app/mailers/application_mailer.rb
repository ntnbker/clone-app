class ApplicationMailer < ActionMailer::Base
  default from: 'info@maintenanceapp.com.au'
  # layout 'mailer'
  # default from: 'notify@mysite.com'


  def send_agency_admin_or_agent_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    @tenant = maintenance_request.tenants.first
    @property = maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email
    end

    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}
    
    mail(to:email, subject:"Maintenance request from #{@tenant.name.capitalize} - #{@property.property_address}")
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
      
      ApplicationMailer.email_extra_tenant(maintenance_request,email,user.id, user.tenant.name).deliver
    end 
    
    
  end

  


  def email_extra_tenant(maintenance_request, tenant_email, user_id, tenant_name)
    @user = User.find_by(id:user_id)
    @maintenance_request = maintenance_request
    @tenant_name = tenant_name
    
    
    
    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}
    mail(to:tenant_email, subject: "Tenants Maintenance Request")
  end


  def tenant_message_notify_email(maintenance_request, user)
    @maintenance_request = maintenance_request
    # @tenant_name = tenant_name
    # @tenant_id = tenant_id
    @tenant = user.tenant
    @user = user
    mail(to:user.email, subject: "New Maintenance Request Message")
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
      
      ApplicationMailer.tenant_message_notify_email(maintenance_request,user).deliver
    end 
    
  end



end



