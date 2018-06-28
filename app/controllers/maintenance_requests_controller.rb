class MaintenanceRequestsController < ApplicationController 
  
  # before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  # before_action(only: [:show]) { maintenance_request_stakeholders(params[:id]) }
  before_action :require_login, only:[:update,:duplicate]
  before_action :require_role
  before_action :set_user, only:[:new,:create]
  
  before_action :customer_input_session, only:[:create,:new]
  before_action :check_for_role, only:[:new]
  #authorize_resource :class => false

  
  #caches_action :new

  def new
    
    if current_user != nil 
      @current_user = current_user
      @role = current_user.current_role
    else
      @current_user == nil
      @role = nil
    end 
      
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
    @maintenance_request.build_maintenance_request_image
    @customer_input = Query.find_by(id:session[:customer_input])
    @agencies = Agency.all.as_json(:include => {:agents => {}, :agency_admins => {}})

  end

  def create
    
    @customer_input = Query.find_by(id:session[:customer_input])
    @maintenance_request = MaintenanceRequest.new(maintenance_request_params)
    @maintenance_request.perform_contact_maintenance_request_validation = true
    if current_user == nil || current_user.logged_in_as("Tenant")
      @maintenance_request.perform_realestate_validations = true
      ####IM CHANGING THE REALESTATE VALIDATIONS TO FALSE ORGINALLY TRUE> FOR THE FRONT END VALIDATIONS #######
      the_agency_admin = AgencyAdmin.find_by(email:params[:maintenance_request][:agent_email].gsub(/\s+/, "").downcase) 
      the_agent = Agent.find_by(email:params[:maintenance_request][:agent_email].gsub(/\s+/, "").downcase) 

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
      email = params[:maintenance_request][:email].gsub(/\s+/, "").downcase

      @user = User.find_by(email:email)

      
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
        @tenant = Tenant.create(user_id:@user.id,name:params[:maintenance_request][:name],email:params[:maintenance_request][:email],mobile:params[:maintenance_request][:mobile])
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
                    contact.tenant.update_columns(property_id: @property.id, mobile:params[:maintenance_request][:mobile])
                  else 
                    user = User.create(hash)
                    @contact_tenant = Tenant.new(hash)
                    @contact_tenant.user_id = user.id
                    @contact_tenant.property_id = @property.id
                    role = Role.create(user_id:user.id)
                    @contact_tenant.save
                    @contact_tenant.roles << role
                    #UserSetPasswordEmailWorker.perform_async(user.id)
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
          @tenant.update_columns(property_id: @property.id, mobile:params[:maintenance_request][:mobile])
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
                      #UserSetPasswordEmailWorker.perform_async(user.id)
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
          #UserSetPasswordEmailWorker.perform_async(@user.id)
          
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
                      #UserSetPasswordEmailWorker.perform_async(user.id)
                      TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    end 
                  end 
                end 
              end 
              
            end 
          end 
      end 
      
      
      the_url = agency_admin_maintenance_request_url(@maintenance_request)
     

      #EmailWorker.perform_in(5.minutes, @maintenance_request.id)

      #AgencyAdminOrAgentNewMaintenanceRequestNotificationTextingWorker.perform_async(@maintenance_request.id,the_url)

      MaintenanceRequest.last.reindex
      if current_user == nil
        EmailWorker.perform_in(5.minutes,@maintenance_request.id)
        flash[:success]= "Thank you for submitting your maintenance request to your real estate agent. An email confirmation has been sent to you. We will keep you updated with its progress."
        redirect_to root_path
      elsif current_user.logged_in_as("AgencyAdmin")
        AgentSubmittedMaintenanceRequestEmailWorker.perform_in(5.minutes,@maintenance_request.id)
        NotifyTenantMaintenanceRequestSubmittedEmailWorker.perform_in(5.minutes,@maintenance_request.id)
        flash[:success]= "Thank you for submitting a maintenance request. An email confirmation has been sent you and the tenant. Please action the maintenance request at the earliest convenience."
        redirect_to agency_admin_maintenance_request_path(@maintenance_request)
      elsif current_user.logged_in_as("Agent")
        AgentSubmittedMaintenanceRequestEmailWorker.perform_in(5.minutes,@maintenance_request.id)
        NotifyTenantMaintenanceRequestSubmittedEmailWorker.perform_in(5.minutes,@maintenance_request.id)
        flash[:success]= "Thank you for submitting a maintenance request. An email confirmation has been sent you and the tenant. Please action the maintenance request at the earliest convenience."
        redirect_to agent_maintenance_request_path(@maintenance_request)
      elsif current_user.logged_in_as("Tenant") 
        EmailWorker.perform_in(5.minutes,@maintenance_request.id)
        flash[:success]= "Thank you for submitting your maintenance request to your real estate agent. An email confirmation has been sent to you. We will keep you updated with its progress."
        redirect_to tenant_maintenance_request_path(@maintenance_request)
      end

      Log.create(maintenance_request_id:@maintenance_request.id, action:"Maintenance request created.")
    else
      
      flash[:danger]= "Please fill out all the required information thanks :)"
      respond_to do |format|
        format.json {render :json=>{errors:@maintenance_request.errors.to_hash(true).as_json}}
        format.html
      end 
      

    end 
  end

  def update

    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request][:maintenance_request_id])
    @maintenance_request.perform_contact_maintenance_request_validation = false
    # @maintenance_request.update(maintenance_description:params[:maintenance_description],service_type:params[:service])
    
    if @maintenance_request.agency_admin 
      if @maintenance_request.agency_admin.agency.tradies 
        @all_tradies = @maintenance_request.agency_admin.agency.skilled_tradies_required(params[:maintenance_request][:service_type])  
      else 
        @all_tradies= []
      end 
    elsif @maintenance_request.agent
      if @maintenance_request.agent.agency.tradies 
        @all_tradies = @maintenance_request.agent.agency.skilled_tradies_required(params[:maintenance_request][:service_type])  
      else 
        @all_tradies= []
      end 
    end 

    



    if @maintenance_request.update(maintenance_request_params)
      respond_to do |format|
        format.json {render :json=>{maintenance_description:params[:maintenance_request][:maintenance_description], service_type:params[:maintenance_request][:service_type], all_tradies:@all_tradies}}
      end
    else
      respond_to do |format|
        format.json {render :json=>{errors:@maintenance_request.errors.to_hash(true).as_json}}
      end
    end 






    # respond_to do |format|
    #   format.json {render :json=>{maintenance_heading:params[:maintenance_heading],maintenance_description:params[:maintenance_description], service_type:params[:service], all_tradies:@all_tradies}}
    #   format.html {render body: nil}

    # end
  end

  def update_status

    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    
    if params[:maintenance_request_status] == "Jobs Completed"
      maintenance_request.action_status.update_columns(agent_status:params[:maintenance_request_status],action_category:params[:action_category], trady_status:"Job Complete")
      QuoteRequest.expire(params[:maintenance_request_id])
    else
      maintenance_request.action_status.update_columns(agent_status:params[:maintenance_request_status],action_category:params[:action_category])
    end 

    action_status = maintenance_request.action_status
    respond_to do |format|
      format.json {render json:action_status}
    end 
  end

  def preapproved
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    

    
    if !params[:preapproved_note].empty? 
      
      
      
      if current_user.logged_in_as("Landlord")
        AgentLandlordApprovedWorkOrderEmailWorker.perform_async(maintenance_request.id)
        Log.create(maintenance_request_id:maintenance_request.id, action:"Landlord approves work order. Please send to tradie.")
        if maintenance_request.action_status.agent_status == "Quote Approved Tradie To Organise Appointment"
        #do nothing
        else 
          maintenance_request.action_status.update_attribute(:agent_status, "Send Work Order")
        end 
      elsif current_user.logged_in_as("Agent") || current_user.logged_in_as("AgencyAdmin")
        Log.create(maintenance_request_id:maintenance_request.id, action:"Agent wrote approval note. Please send work order to tradie.") 
      end 
      
      maintenance_request.update_attribute(:preapproved_note, params[:preapproved_note])
      respond_to do |format|
        format.json {render :json=>{:preapproved_note=>params[:preapproved_note]}}
      end
    else
      respond_to do |format|
        format.json {render :json=>{errors:"Note must not be blank thank you."}}
      end 
    end 
      
  end

  def defer
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.action_status.update_attribute(:agent_status, "Defer")
    AgentLandlordDeferredMaintenanceEmailWorker.perform_async(maintenance_request.id)
    Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request deferred by landlord.")
  end



  def duplicate
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @tenant = @maintenance_request.tenants.first
    @maintenance_request_duplicate = @maintenance_request.dup
    @maintenance_request_duplicate.trady_id = nil
    @maintenance_request_duplicate.jfmo_status = "Passive"
    @maintenance_request_duplicate.save
    @images = @maintenance_request.images
    TenantMaintenanceRequest.create(tenant_id:@tenant.id, maintenance_request_id:@maintenance_request_duplicate.id)

    @images.each do |image|
      image_duplicate = image.dup

      image_duplicate.maintenance_request_id = @maintenance_request_duplicate.id
      image_duplicate.save
    end 



    if current_user.logged_in_as("Agent")
      flash[:success] = "You have made a copy of a maintenance request. It is now listed as a new maintenance request."
      redirect_to agent_maintenance_requests_path
    elsif current_user.logged_in_as("AgencyAdmin")
      flash[:success] = "You have made a copy of a maintenance request. It is now listed as a new maintenance request."
      redirect_to agency_admin_maintenance_requests_path
    end


  end

  def split
    
    #@maintenance_request = MaintenanceRequest.new(split_maintenance_request_params)
    original_maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request][:maintenance_request_id])
    tenant = original_maintenance_request.tenants.first
    errors = []
    success = []
    if original_maintenance_request.agent
      agent_id = original_maintenance_request.agent.id
      agency_admin = nil
    elsif original_maintenance_request.agency_admin
      agency_admin_id = original_maintenance_request.agency_admin.id
      agent = nil 
    end 
    
    array = params[:maintenance_requests].to_a
    maintenance_requests_array = []
    success_array = []
    counter = 0
    array.each do |maintenance_request|
      counter = counter + 1
      @maintenance_request = MaintenanceRequest.new(name:original_maintenance_request.name,email:original_maintenance_request.email,mobile:original_maintenance_request.mobile,property_id:original_maintenance_request.property_id,maintenance_description:maintenance_request[1][:maintenance_description], service_type: maintenance_request[1][:service_type], agency_admin_id: agency_admin_id, agent_id: agent_id, jfmo_status: "Passive")
      
      @maintenance_request.perform_contact_maintenance_request_validation = false
      if @maintenance_request.valid?


        @maintenance_request.save
        TenantMaintenanceRequest.create(tenant_id:tenant.id, maintenance_request_id:@maintenance_request.id)
        # ActionStatus.create(maintenance_request_status:"New",agent_status:"Initiate Maintenance Request",action_category:"Action Required" , maintenance_request_id:@maintenance_request.id)
        success.push(@maintenance_request)
      else
        @maintenance_request.id = counter
        errors.push(@maintenance_request.as_json(methods: :errors))
        
      end 

    end 


    respond_to do |format|
      format.json {render :json=> {errors: errors, success:success}}
      
    end
    
    
  end



  private

  

  def maintenance_request_params
    params.require(:maintenance_request).permit(:maintenance_request_id,:agency_business_name,  :service_type,:name,:email,:mobile,:maintenance_heading,:availability_and_access,:agent_id,:agency_admin_id,:tenant_id,:tradie_id,:maintenance_description,:images,:availability,:access_contact,:real_estate_office, :agent_email, :agent_name, :agent_mobile,:person_in_charge ,availabilities_attributes:[:id,:maintenance_request_id,:date,:start_time,:finish_time,:available_only_by_appointment,:_destroy],access_contacts_attributes: [:id,:maintenance_request_id,:relation,:name,:email,:mobile,:_destroy], images_attributes:[:id,:maintenance_request_id,:image,:_destoy])
  end

  def set_user
    @user = User.new
  end

  def check_for_role
    @customer_input = Query.find_by(id:session[:customer_input])
    if @customer_input
      if current_user
        if current_user.current_role.role == "AgencyAdmin" || current_user.current_role.role == "Agent"
          if @customer_input.user_role == "Tenant"
            flash[:notice] = "Sorry you are signed in as an agent. To submit a maintenance request as a tenant please log out and try again."
            redirect_to root_path
          end 
        elsif current_user.current_role.role == "Landlord" 
          if @customer_input.user_role == "Tenant" || @customer_input.user_role == "Agent"
            flash[:notice] = "Sorry you are signed in as a Landlord. To submit a maintenance request as a tenant please log out and try again."
            redirect_to root_path
          end 
        elsif current_user.current_role.role == "Trady"
          if @customer_input.user_role == "Tenant" || @customer_input.user_role == "Agent"
            flash[:notice] = "Sorry you are signed in as a Trady. To submit a maintenance request as a tenant please log out and try again."
            redirect_to root_path
          end 
        end 
      end
    else
      flash[:danger] =  "Sorry you must fill in all the required fields."
      redirect_to root_path

    end  
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







