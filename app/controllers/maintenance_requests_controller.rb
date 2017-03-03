class MaintenanceRequestsController < ApplicationController 
  
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action(only: [:show]) { maintenance_request_stakeholders(params[:id]) }
  before_action :set_user, only:[:new,:create]
  before_action :require_login, only:[:show,:index]
  before_action :customer_input_session, only:[:create,:new]
  authorize_resource :class => false

  def new
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
    @maintenance_request.build_maintenance_request_image
    @customer_input = Query.find_by(id:session[:customer_input])
  end

  def create
    
    @customer_input = Query.find_by(id:session[:customer_input])
    @maintenance_request = MaintenanceRequest.new(maintenance_request_params)
    
    if current_user.agency_admin?
      @agency_admin = current_user.agency_admin
      @maintenance_request.agency_admin_id = @agency_admin.id
      @maintenance_request.perform_realestate_validations = false
    elsif current_user.agent?
      @agent = current_user.agent
      @maintenance_request.agent_id = @agent.id
      @maintenance_request.perform_realestate_validations = false
    elsif current_user == nil || current_user.tenant?
      @maintenance_request.perform_realestate_validations = true
    end 
    
    
    if @maintenance_request.valid?
      
      
      #This user already exists
      @user = User.find_by(email: params[:maintenance_request][:email])
      if @user 
        @maintenance_request.perform_uniqueness_validation_of_email = false
        #user = User.find_by(email:params[:maintenance_request][:email]).id
        @tenant = Tenant.find_by(user_id:@user.id)
        
        #look up property
        @property = Property.find_by(property_address:@customer_input.address)
        #CREATE PROPERTY
        if !@property
          @property = Property.create(property_address:@customer_input.address, agency_admin_id:@agency_admin.id)
          @maintenance_request.property_id = @property.id
          

          if @tenant.property_id.nil?
            @tenant.update_attribute(:property_id, @property.id)
          else
            @tenant.property_id = @tenant.property_id
          end 
        
        else
          #@property = Property.find_by(property_address:@customer_input.address)
          @maintenance_request.property_id = @property.id
          if @tenant.property_id.nil?
            @tenant.update_attribute(:property_id, @property.id)
          else
            @tenant.property_id = @tenant.property_id
          end 
        end 

        #@maintenance_request.tenant_id = @tenant.id
        @maintenance_request.service_type = @customer_input.tradie
        
        

        @maintenance_request.save 


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

                   if contact
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
                      TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                   end
                end 
              end 
            end 
            
          end 
        end 





      @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)



      
        
        #EmailWorker.perform_async(@maintenance_request.id)
         
      else #This user does not exist
        #CREATE USER
        @maintenance_request.perform_uniqueness_validation_of_email = true
        @user = User.create(email:params[:maintenance_request][:email], password:SecureRandom.hex(5))
        role = Role.create(user_id:@user.id)
        @tenant = Tenant.create(user_id:@user.id, name:params[:maintenance_request][:name],email:params[:maintenance_request][:email], mobile:params[:maintenance_request][:mobile] )
        @tenant.roles << role
        @maintenance_request.tenant_id = @tenant.id
        @maintenance_request.service_type = @customer_input.tradie
        
        #CREATE PROPERTY
        @property = Property.find_by(property_address:@customer_input.address)
        if !@property
          @property = Property.create(property_address:@customer_input.address, agency_admin_id:@agency_admin.id)
          @maintenance_request.property_id = @property.id
          @tenant.update_attribute(:property_id, @property.id)
        else
          @property = Property.find_by(property_address:@customer_input.address)
          @maintenance_request.property_id = @property.id
          @tenant.update_attribute(:property_id, @property.id)
        end 

        
        @maintenance_request.save
        
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
                  contact = User.find_by(email:value )

                   if contact
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
                    TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)

                  end
                end 
              end 
            end 
            
          end 
        end 


        @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)



      end 
      
      

     
      EmailWorker.perform_async(@maintenance_request.id)
      

      MaintenanceRequest.last.reindex

     if current_user.agency_admin? || current_user.agent? || current_user.landlord? || current_user.tenant? || current_user.trady? 
      flash[:success]= "Thank You for creating a Maintenance Request"
      redirect_to maintenance_request_path(@maintenance_request)
     else
       flash[:danger]= "Sorry you can't see that please log in first to see your maintenance request"
       redirect_to root_path
      end
      
    else
      
      flash[:danger]= "Something went wrong"
      render :new
      
    end 
    
  end

  def show
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @tenants = @maintenance_request.tenants
    @quotes = @maintenance_request.quotes.where(:delivery_status=>true)
    @quote = @quotes.where(:status=>"Approved").first if !nil
    @message = Message.new
    @landlord = Landlord.new
    @tradie = Trady.new
     
    if @maintenance_request.maintenance_request_image != nil
      @gallery = @maintenance_request.maintenance_request_image.images
    end 
    
    if @maintenance_request.trady != nil
      @trady_id = @maintenance_request.trady.id
      if @maintenance_request.trady.trady_company != nil
        @trady_company_id = @maintenance_request.trady.trady_company.id
      end 
    end 
   
    if !@maintenance_request.invoices.empty? 
      @invoice = @maintenance_request.invoices.first
    end 

    if @maintenance_request.agency_admin != nil
      if @maintenance_request.agency_admin.agency.tradies !=nil
        @all_tradies = @maintenance_request.agency_admin.agency.tradies.where(:skill=>@maintenance_request.service_type) 
      else 
        @all_tradies= []
      end 
    end 

    if @maintenance_request.agent != nil
      if @maintenance_request.agent.agency.tradies !=nil 
        @all_tradies = @maintenance_request.agent.agency.tradies.where(:skill=>@maintenance_request.service_type) 
      else 
        @all_tradies= []
      end
    end 
    



    if @maintenance_request.conversations.where(:conversation_type=>"Tenant").present?
      @tenants_conversation = @maintenance_request.conversations.where(:conversation_type=>"Tenant").first.messages
    end 

    if @maintenance_request.conversations.where(:conversation_type=>"Landlord").present?
      @landlords_conversation = @maintenance_request.conversations.where(:conversation_type=>"Landlord").first.messages
    end 
    
  end


  def index

    if current_user.agency_admin?
      @maintenance_requests = current_user.agency_admin.maintenance_requests.paginate(:page => params[:page], :per_page => 1)

    elsif current_user.agent?
      @maintenance_requests = current_user.agent.maintenance_requests.paginate(:page => params[:page], :per_page => 1)

    elsif current_user.tenant?
      @maintenance_requests = current_user.tenant.maintenance_requests.paginate(:page => params[:page], :per_page => 1)
    
    end 

    @new_maintenance_requests_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Initiate Maintenance Request")
    @quotes_received_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Received")
    @new_invoice_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "New Invoice")
    @pending_payment_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Pending Payment")
    
    @awaiting_owner_initiation_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Owner Initiation")
    @awaiting_owner_instruction_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Owner Instruction")
    @quote_requested_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Requested")
    @awaiting_trady_initiation_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Tradie Initiation")
    @awaiting_trady_quote_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Awaiting Quote")
    @awaiting_quote_approval_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Received Awaiting Approval")
    @trady_organise_appointment_count = MaintenanceRequest.find_maintenance_requests_total(current_user, "Quote Approved Tradie To Organise Appointment")
    @trady_confirm_appointment_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Tradie To Confirm Appointment")
    @tenant_confirm_appointment_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Tenant To Confirm Appointment")
    @landlord_confirm_appointment_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Landlord To Confirm Appointment")
    @maintenance_scheduled_count =MaintenanceRequest.find_maintenance_requests_total(current_user, "Maintenance Scheduled - Awaiting Invoice")
  end


  private

  def maintenance_request_params
    params.require(:maintenance_request).permit(:name,:email,:mobile,:maintenance_heading,:agent_id,:agency_admin_id,:tenant_id,:tradie_id,:maintenance_description,:image,:availability,:access_contact,:real_estate_office, :agent_email, :agent_name, :agent_mobile,:person_in_charge ,availabilities_attributes:[:id,:maintenance_request_id,:date,:start_time,:finish_time,:available_only_by_appointment,:_destroy],access_contacts_attributes: [:id,:maintenance_request_id,:relation,:name,:email,:mobile,:_destroy], maintenance_request_image_attributes:[:id, :maintenance_request_id,{images: []},:_destroy])
  end

  def set_user
    @user = User.new
  end

  def email_auto_login(id)

    if current_user == nil
      user = User.find_by(id:id)
      auto_login(user)
    end 
  end

  def maintenance_request_stakeholders(maintenance_request_id)
    mr = MaintenanceRequest.find_by(id:maintenance_request_id)
    mr_tenants = mr.tenants
    mr_agent = mr.agent.user.id if mr.agent != nil
    mr_agency_admin = mr.agency_admin.user.id if mr.agency_admin != nil
    mr_landlord = mr.property.landlord.user.id if mr.property.landlord_id != nil 
    mr_trady = mr.trady.user.id if mr.trady !=nil
    
    mr_user_affiliates_array = []
    
    if mr_agent != nil
      mr_user_affiliates_array.push(mr_agent)
    end 

    if mr_agency_admin != nil
      mr_user_affiliates_array.push(mr_agency_admin)
    end

    if mr_landlord !=nil 
      mr_user_affiliates_array.push(mr_landlord)
    end

    if mr_trady !=nil 
      mr_user_affiliates_array.push(mr_trady)
    end 


    
    mr_tenants.each do |tenant|
      mr_user_affiliates_array.push(tenant.user.id)
    end 


    
    
    
    if mr_user_affiliates_array.include?(current_user.id)
        #do nothing
    
    else
      flash[:danger] = "Sorry you are not allowed to see that!!!"
      redirect_to root_path
    end
  end



end 







