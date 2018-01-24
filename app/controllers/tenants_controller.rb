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
        @tenant = Tenant.create(user_id:@user.id,name:params[:maintenance_request][:name],email:params[:maintenance_request][:email],mobile:params[:maintenance_request][:mobile])
        @tenant.roles << role
        role.save
        
        
        @tenant.update_attribute(:property_id, @property.id)
         
        @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)

        
      elsif @user && existing_role == true
      ###################################     
        # @maintenance_request.perform_uniqueness_validation_of_email = false
          @tenant = Tenant.find_by(user_id:@user.id)
          @tenant.update_columns(property_id: @property.id, mobile:params[:maintenance_request][:mobile])
          @maintenance_request.service_type = @customer_input.tradie
          @maintenance_request.save 
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)

          

      #########################
      else #This user does not exist
          #CREATE USER
          #@maintenance_request.perform_uniqueness_validation_of_email = true
          @user = User.create(email:params[:maintenance_request][:email], password:SecureRandom.hex(5))
          role = Role.create(user_id:@user.id)
          @tenant = Tenant.create(property_id:@property.id,user_id:@user.id, name:params[:maintenance_request][:name],email:params[:maintenance_request][:email], mobile:params[:maintenance_request][:mobile] )
          @tenant.roles << role
          @maintenance_request.tenant_id = @tenant.id
          @maintenance_request.service_type = @customer_input.tradie
          @maintenance_request.save
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:@maintenance_request.id)
          #UserSetPasswordEmailWorker.perform_async(@user.id)
          
        
      end 
      
      
      the_url = agency_admin_maintenance_request_url(@maintenance_request)
     

      #EmailWorker.perform_in(5.minutes, @maintenance_request.id)

      #AgencyAdminOrAgentNewMaintenanceRequestNotificationTextingWorker.perform_async(@maintenance_request.id,the_url)

      
      Log.create(maintenance_request_id:@maintenance_request.id, action:"Maintenance request created.")
    
      respond_to do |format|
        format.json {render :json=>{errors:@maintenance_request.errors.to_hash(true).as_json}}
        format.html
      end 
      

    
  end
  
  def delete
    
  end
end 