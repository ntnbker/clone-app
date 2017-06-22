class MaintenanceRequestsController < ApplicationController 
  
  # before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  # before_action(only: [:show]) { maintenance_request_stakeholders(params[:id]) }
  before_action :set_user, only:[:new,:create]
  
  before_action :customer_input_session, only:[:create,:new]
  authorize_resource :class => false

  def new
    
    if current_user != nil 
      @role = current_user.current_role

      if @role == "Tenant"
        
      else
      end 
    else
      @role = nil
    end 
      
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
    @maintenance_request.build_maintenance_request_image
    @customer_input = Query.find_by(id:session[:customer_input])


    
  end

  def create
    
    @customer_input = Query.find_by(id:session[:customer_input])
    @maintenance_request = MaintenanceRequest.new(maintenance_request_params)

    if current_user == nil || current_user.logged_in_as("Tenant")
      @maintenance_request.perform_realestate_validations = false
      ####IM CHANGING THE REALESTATE VALIDATIONS TO FALSE ORGINALLY TRUE> FOR THE FRONT END VALIDATIONS #######
      the_agency_admin = AgencyAdmin.find_by(email:params[:maintenance_request][:agent_email]) 
      the_agent = Agent.find_by(email:params[:maintenance_request][:agent_email]) 

        if the_agency_admin
          @agency_admin = the_agency_admin
          @maintenance_request.agency_admin_id = @agency_admin.id
          @agency = @agency_admin.agency
        end
        if the_agent
          @agent = the_agent
          @agency_admin = @agent.agency.agency_admins.first
          @maintenance_request.agent_id = @agent.id
          @agency = @agent.agency
        end
        if the_agency_admin == nil && the_agent == nil
          @agent = nil
          @agency_admin = nil
          @maintenance_request.agent_id = nil
          @agency = nil
        end 

    elsif current_user.logged_in_as("AgencyAdmin")
      @agency_admin = current_user.agency_admin
      @agency = @agency_admin.agency
      @maintenance_request.agency_admin_id = @agency_admin.id
      @maintenance_request.perform_realestate_validations = false
    elsif current_user.logged_in_as("Agent")
      @agent = current_user.agent
      @agency = @agent.agency
      @agency_admin = @agent.agency.agency_admins.first
      @maintenance_request.agent_id = @agent.id
      @maintenance_request.perform_realestate_validations = false
    end 

    
    
        if @maintenance_request.valid?

      @user = User.find_by(email: params[:maintenance_request][:email])
      if @user
        existing_role = @user.get_role("Tenant").present?
      end
      #look up property 
      @property = Property.find_by(property_address:@customer_input.address)
      #CREATE PROPERTY
      if !@property
        @property = Property.create(property_address:@customer_input.address, agency_admin_id:@agency_admin.id, agency_id:@agency.id)
        @maintenance_request.property_id = @property.id
      else
        @property = Property.find_by(property_address:@customer_input.address)
        @maintenance_request.property_id = @property.id
      end 


      ############################    
      if @user && existing_role == false
        role = Role.new(user_id:@user.id)
        @tenant = Tenant.create(user_id:@user.id,full_name:params[:maintenance_request][:name],email:params[:maintenance_request][:email],mobile:params[:maintenance_request][:mobile])
        @tenant.roles << role
        role.save
        
        @maintenance_request.perform_uniqueness_validation_of_email = false
        @tenant.update_attribute(:property_id, @property.id)
        @maintenance_request.service_type = @customer_input.tradie
        @maintenance_request.save 
        @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)

        
        #CREATE EXTRA TENANT FROM ACCESS CONTACTS LIST IF THEY ARE "TENANT"
        access_contact_params = params[:maintenance_request][:access_contacts_attributes]
        if access_contact_params
          
          access_contact_params.each_value do |hash|
            #this hash below pushes a PW key/value into the access_contacts_params has
            #so the hash can just be used to create a user and a tenant right away
            #must refactor!!
            hash[:password] = SecureRandom.hex(5)
            if hash.has_value?("Tenant")
              hash.each do |key, value|
                if key == "email"
                  contact = User.find_by(email:value )
                  #
                  contact = User.find_by(email:value)
                  if contact
                    existing_role = contact.get_role("Tenant").present?
                  end 
                  
                  if contact && existing_role == false
                    @contact_tenant = Tenant.new(hash)
                    @contact_tenant.user_id = contact.id
                    @contact_tenant.property_id = @property.id
                    role = Role.create(user_id:contact.id)
                    @contact_tenant.save
                    @contact_tenant.roles << role
                    TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                  elsif contact && existing_role == true
                    TenantMaintenanceRequest.create(tenant_id:contact.tenant.id,maintenance_request_id:@maintenance_request.id)
                    contact.tenant.update_attribute(:property_id,@property.id)
                  else 
                    user = User.create(hash)
                    @contact_tenant = Tenant.new(hash)
                    @contact_tenant.user_id = user.id
                    @contact_tenant.property_id = @property.id
                    role = Role.create(user_id:user.id)
                    @contact_tenant.save
                    @contact_tenant.roles << role
                    UserSetPasswordEmailWorker.perform_async(user.id)
                    TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                  end 
                end 
              end 
            end 
            
          end 
        end 

      elsif @user && existing_role == true
      ###################################     
        @maintenance_request.perform_uniqueness_validation_of_email = false
          @tenant = Tenant.find_by(user_id:@user.id)
          @tenant.update_attribute(:property_id, @property.id)
          @maintenance_request.service_type = @customer_input.tradie
          @maintenance_request.save 
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)

          #CREATE EXTRA TENANT FROM ACCESS CONTACTS LIST IF THEY ARE "TENANT"
         
          access_contact_params = params[:maintenance_request][:access_contacts_attributes]
         
         
          if access_contact_params
            
            access_contact_params.each_value do |hash|
              #this hash below pushes a PW key/value into the access_contacts_params has
              #so the hash can just be used to create a user and a tenant right away
              #must refactor!!
              hash[:password] = SecureRandom.hex(5)
              if hash.has_value?("Tenant")
                hash.each do |key, value|
                  if key == "email"
                    #
                    contact = User.find_by(email:value)
                    if contact
                      existing_role = contact.get_role("Tenant").present?
                    end 
                    
                    if contact && existing_role == false
                      @contact_tenant = Tenant.new(hash)
                      @contact_tenant.user_id = contact.id
                      @contact_tenant.property_id = @property.id
                      role = Role.create(user_id:contact.id)
                      @contact_tenant.save
                      @contact_tenant.roles << role
                      TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    elsif contact && existing_role == true
                      TenantMaintenanceRequest.create(tenant_id:contact.tenant.id,maintenance_request_id:@maintenance_request.id)
                      contact.tenant.update_attribute(:property_id,@property.id)
                    else 
                      user = User.create(hash)
                      @contact_tenant = Tenant.new(hash)
                      @contact_tenant.user_id = user.id
                      @contact_tenant.property_id = @property.id
                      role = Role.create(user_id:user.id)
                      @contact_tenant.save
                      @contact_tenant.roles << role
                      UserSetPasswordEmailWorker.perform_async(user.id)
                      TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    end 
                  end 
                end 
              end 
              
            end 
          end 

      #########################
      else #This user does not exist
          #CREATE USER
          @maintenance_request.perform_uniqueness_validation_of_email = true
          @user = User.create(email:params[:maintenance_request][:email], password:SecureRandom.hex(5))
          role = Role.create(user_id:@user.id)
          @tenant = Tenant.create(property_id:@property.id,user_id:@user.id, name:params[:maintenance_request][:name],email:params[:maintenance_request][:email], mobile:params[:maintenance_request][:mobile] )
          @tenant.roles << role
          @maintenance_request.tenant_id = @tenant.id
          @maintenance_request.service_type = @customer_input.tradie
          @maintenance_request.save
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)
          UserSetPasswordEmailWorker.perform_async(@user.id)
          
          #CREATE TENANTS
          access_contact_params = params[:maintenance_request][:access_contacts_attributes]
          if access_contact_params
            access_contact_params.each_value do |hash|
              #this hash below pushes a PW key/value into the access_contacts_params has
              #so the hash can just be used to create a user and a tenant right away
              #must refactor!!
              hash[:password] = SecureRandom.hex(5)
              if hash.has_value?("Tenant")
                hash.each do |key, value|
                  if key == "email"
                    #
                    contact = User.find_by(email:value)
                    if contact
                      existing_role = contact.get_role("Tenant").present?
                    end 
                    
                    if contact && existing_role == false
                      @contact_tenant = Tenant.new(hash)
                      @contact_tenant.user_id = contact.id
                      @contact_tenant.property_id = @property.id
                      role = Role.create(user_id:contact.id)
                      @contact_tenant.save
                      @contact_tenant.roles << role
                      TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    elsif contact && existing_role == true
                      
                      TenantMaintenanceRequest.create(tenant_id:contact.tenant.id,maintenance_request_id:@maintenance_request.id)
                      contact.tenant.update_attribute(:property_id,@property.id)
                    else 
                      user = User.create(hash)
                      @contact_tenant = Tenant.new(hash)
                      @contact_tenant.user_id = user.id
                      @contact_tenant.property_id = @property.id
                      role = Role.create(user_id:user.id)
                      @contact_tenant.save
                      @contact_tenant.roles << role
                      UserSetPasswordEmailWorker.perform_async(user.id)
                      TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    end 
                  end 
                end 
              end 
              
            end 
          end 
      end 
      
      
      
     
      EmailWorker.perform_async(@maintenance_request.id)
      

      MaintenanceRequest.last.reindex
      if current_user == nil
        flash[:success]= "Thank You for creating a maintenance request, please log in to see your maintenance request"
        redirect_to root_path
      elsif current_user.logged_in_as("AgencyAdmin") 
        flash[:success]= "Thank You for creating a Maintenance Request"
        redirect_to agency_admin_maintenance_request_path(@maintenance_request)
      elsif current_user.logged_in_as("Agent")
        flash[:success]= "Thank You for creating a Maintenance Request"
        redirect_to agent_maintenance_request_path(@maintenance_request)
      elsif current_user.logged_in_as("Tenant") 
        flash[:success]= "Thank You for creating a Maintenance Request"
        redirect_to tenant_maintenance_request_path(@maintenance_request)
      end

      Log.create(maintenance_request_id:@maintenance_request.id, action:"Request Created")
      
    else
      
      flash[:danger]= "Something went wrong"
      render json: @maintenance_request.errors

    end 
  end

  def update
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])

    maintenance_request.update_columns(maintenance_heading:params[:maintenance_heading], maintenance_description:params[:maintenance_description])
    respond_to do |format|
      format.json {render :json=>{maintenance_heading:params[:maintenance_heading],maintenance_description:params[:maintenance_description]}}
      format.html {render body: nil}

    end
  end



  private

  def maintenance_request_params
    params.require(:maintenance_request).permit(:name,:email,:mobile,:maintenance_heading,:agent_id,:agency_admin_id,:tenant_id,:tradie_id,:maintenance_description,:images,:availability,:access_contact,:real_estate_office, :agent_email, :agent_name, :agent_mobile,:person_in_charge ,availabilities_attributes:[:id,:maintenance_request_id,:date,:start_time,:finish_time,:available_only_by_appointment,:_destroy],access_contacts_attributes: [:id,:maintenance_request_id,:relation,:name,:email,:mobile,:_destroy], images_attributes:[:id,:maintenance_request_id,:image,:_destoy])
  end

  def set_user
    @user = User.new
  end

  # def email_auto_login(id)

  #   if current_user == nil
  #     user = User.find_by(id:id)
  #     auto_login(user)
  #   end 
  # end

  def maintenance_request_stakeholders(maintenance_request_id)
    # mr = MaintenanceRequest.find_by(id:maintenance_request_id)
    # mr_tenants = mr.tenants
    # #mr_agent = mr.agent.user.id if mr.agent != nil
    # mr_agency_admin = mr.agency_admin.user.id if mr.agency_admin != nil
    # mr_landlord = mr.property.landlord.user.id if mr.property.landlord_id != nil 
    # mr_trady = mr.trady.user.id if mr.trady !=nil
    
    # mr_user_affiliates_array = []
    
    # if mr_agent != nil
    #   mr_user_affiliates_array.push(mr_agent)
    # end 

    # if mr_agency_admin != nil
    #   mr_user_affiliates_array.push(mr_agency_admin)
    # end

    # if mr_landlord !=nil 
    #   mr_user_affiliates_array.push(mr_landlord)
    # end

    # if mr_trady !=nil 
    #   mr_user_affiliates_array.push(mr_trady)
    # end 


    
    # mr_tenants.each do |tenant|
    #   mr_user_affiliates_array.push(tenant.user.id)
    # end 


    
    
    
    # if mr_user_affiliates_array.include?(current_user.id)
    #     #do nothing
    
    # else
    #   flash[:danger] = "Sorry you are not allowed to see that!!!"
    #   redirect_to root_path
    # end
  end



end 







