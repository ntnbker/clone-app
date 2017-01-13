class MaintenanceRequestsController < ApplicationController 
  
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action(only: [:show]) { maintenance_request_stakeholders(params[:id]) }
  before_action :set_user, only:[:new,:create]
  before_action :require_login, only:[:create,:show,:index]
  authorize_resource :class => false

  def new
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
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
       
       

        access_contact_params.each_value do |hash|
          
          if hash.has_value?("Tenant")
            hash.each do |key, value|
              if key == "email"
                contact = User.find_by(email:value )

                 if contact
                  TenantMaintenanceRequest.create(tenant_id:contact.tenant.id,maintenance_request_id:@maintenance_request.id)
                  contact.tenant.update_attribute(:property_id,@property.id)
                 else 
                  if  key =="email" 
                    user = User.create(email:value, password:SecureRandom.hex(5))
                    @contact_tenant = Tenant.new(email:value, full_name:value,mobile:value,user_id:user.id, property_id:@property.id)
                    
                    
                    role = Role.create(user_id:user.id)
                    @contact_tenant.save
                    @contact_tenant.roles << role
                    TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    if key =="name"
                      @contact_tenant.update_attribute(:name,value)
                    end 
                    if key =="mobile"
                      @contact_tenant.update_attribute(:mobile,value)
                    end 

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
        @tenant = Tenant.create(user_id:@user.id, full_name:params[:maintenance_request][:name],email:params[:maintenance_request][:email], mobile:params[:maintenance_request][:mobile] )
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
        
        #CREATE TENATNS
        access_contact_params = params[:maintenance_request][:access_contacts_attributes]
        access_contact_params.each_value do |hash|
          
          if hash.has_value?("Tenant")
            hash.each do |key, value|
              if key == "email"
                contact = User.find_by(email:value )

                 if contact
                  TenantMaintenanceRequest.create(tenant_id:contact.tenant.id,maintenance_request_id:@maintenance_request.id)
                  contact.tenant.update_attribute(:property_id,@property.id)
                 else 
                  if  key =="email" 
                    user = User.create(email:value, password:SecureRandom.hex(5))
                    @contact_tenant = Tenant.new(email:value, full_name:value,mobile:value,user_id:user.id,property_id:@property.id)
                    
                    
                    role = Role.create(user_id:user.id)
                    @contact_tenant.save
                    @contact_tenant.roles << role
                    TenantMaintenanceRequest.create(tenant_id:@contact_tenant.id,maintenance_request_id:@maintenance_request.id)
                    if key =="name"
                      @contact_tenant.update_attribute(:name,value)
                    end 
                    if key =="mobile"
                      @contact_tenant.update_attribute(:mobile,value)
                    end 

                  end 

                end
              end 
            end 
          end 
          
        end 



        @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)




        
        
        #EmailWorker.perform_async(@maintenance_request.id)
      end 
      
      

     
      EmailWorker.perform_async(@maintenance_request.id)
      



      
      flash[:success]= "Thank You for creating a Maintenance Request"
      redirect_to maintenance_request_path(@maintenance_request)
       
      
      
    else
      flash[:danger]= "something went wrong"
      render :new
      
    end 
    
  end

  def show
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
    @tenants = @maintenance_request.tenants
    #@tradies = Tradie 
    
    @message = Message.new
    @landlord = Landlord.new
    @tradie = Trady.new

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
    
  


  end


  def index

    if current_user.agency_admin?
      @maintenance_requests = current_user.agency_admin.maintenance_requests
    elsif current_user.agent?
      @maintenance_requests = current_user.agent.maintenance_requests
    elsif current_user.tenant?
      @maintenance_requests = current_user.tenant.maintenance_requests
    end 

  end


  private

  def maintenance_request_params
    params.require(:maintenance_request).permit(:name,:email,:mobile,:maintenance_heading,:agent_id,:agency_admin_id,:tenant_id,:tradie_id,:maintenance_description,:image,:availability,:access_contact,:real_estate_office, :agent_email, :agent_name, :agent_mobile,:person_in_charge ,availabilities_attributes:[:id,:maintenance_request_id,:date,:start_time,:finish_time,:available_only_by_appointment,:_destroy],access_contacts_attributes: [:id,:maintenance_request_id,:relation,:name,:email,:mobile,:_destroy])
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
    mr_landlord = mr.property.landlord_id if mr.property.landlord_id != nil 
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



    mr_tenants.each do |tenant|
      mr_user_affiliates_array.push(tenant.user.id)
    end 
    
    if mr_user_affiliates_array.include?(current_user.id)
        #do nothing
      else
        flash[:danger] = "Sorry you are not allowed to see that"
        redirect_to root_path
    end
  end



end 







