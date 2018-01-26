class TenantsController < ApplicationController
  

  def create
    
    
    
    
      email = params[:tenant][:email].gsub(/\s+/, "").downcase

      @user = User.find_by(email:email)

      
      if @user
        existing_role = @user.get_role("Tenant").present?
      end
      #look up property 
      @property = Property.find_by(property_address:params[:tenant][:property])
      #CREATE PROPERTY
      


      ############################    
      if @user && existing_role == false
        role = Role.new(user_id:@user.id)
        @tenant = Tenant.create(user_id:@user.id,name:params[:tenant][:name],email:params[:tenant][:email],mobile:params[:tenant][:mobile], property_id:@property.id)
        @tenant.roles << role
        role.save
        
        
        #@tenant.update_attribute(:property_id, @property.id)
         
        @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])

        
      elsif @user && existing_role == true
      ###################################     
        # @maintenance_request.perform_uniqueness_validation_of_email = false
          @tenant = Tenant.find_by(user_id:@user.id)
          @tenant.update_columns(property_id: @property.id, mobile:params[:tenant][:mobile])
          @maintenance_request.service_type = @customer_input.tradie
          @maintenance_request.save 
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])

          

      #########################
      else #This user does not exist
          #CREATE USER
          #@maintenance_request.perform_uniqueness_validation_of_email = true
          @user = User.create(email:params[:tenant][:email], password:SecureRandom.hex(5))
          role = Role.create(user_id:@user.id)
          @tenant = Tenant.create(property_id:@property.id,user_id:@user.id, name:params[:tenant][:name],email:params[:tenant][:email], mobile:params[:tenant][:mobile] )
          @tenant.roles << role
          
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])
          #UserSetPasswordEmailWorker.perform_async(@user.id)
          
        
      end 
      
      
      the_url = agency_admin_maintenance_request_url(@maintenance_request)
     

      #EmailWorker.perform_in(5.minutes, @maintenance_request.id)

      #AgencyAdminOrAgentNewMaintenanceRequestNotificationTextingWorker.perform_async(@maintenance_request.id,the_url)

      
      
    
      respond_to do |format|
        format.json {render :json=>{errors:@tenant.errors.to_hash(true).as_json}}
        format.html
      end 
      

    
  end

  def update
    
  end
  
  def delete
    
  end
end 