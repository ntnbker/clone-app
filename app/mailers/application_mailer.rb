require 'digest/sha2'
class ApplicationMailer < ActionMailer::Base
  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
  default from: 'info@sm.maintenanceapp.com.au'
  # layout 'mailer'
  # default from: 'notify@mysite.com'


  def send_agency_admin_or_agent_maintenance_request_email(maintenance_request)
    @maintenance_request = maintenance_request
    @tenant = maintenance_request.tenants.first
    @property = maintenance_request.property
    if @maintenance_request.agent 
      @user = @maintenance_request.agent.user
      email = @maintenance_request.agent.email
      @agent = maintenance_request.agent
    elsif @maintenance_request.agency_admin 
      @user = @maintenance_request.agency_admin.user
      email = @maintenance_request.agency_admin.email
      @agent = maintenance_request.agency_admin
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
    @property = maintenance_request.property
    @tenant_name = tenant_name
    
    
    
    track user: @user
    track extra: {maintenance_request_id:maintenance_request.id}
    mail(to:tenant_email, subject: " Receipt for maintenance request - #{@property.property_address}")
  end


  def tenant_message_notify_email(maintenance_request, user)
    @maintenance_request = maintenance_request
    # @tenant_name = tenant_name
    # @tenant_id = tenant_id
    @property = maintenance_request.property
    if @maintenance_request.agent
      @agency = @maintenance_request.agent.agency
      @agent = @maintenance_request.agent
    elsif @maintenance_request.agency_admin
      @agency = @maintenance_request.agency_admin.agency
      @agent = @maintenance_request.agency_admin
    end
    @tenant = user.tenant
    @user = user
    mail(to:user.email, subject: "Message received from #{@agency.company_name.capitalize} - #{@property.property_address}")
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



