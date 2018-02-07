class TenantsController < ApplicationController

  before_action :require_login

   def edit
    @tenant = Tenant.find_by(id:params[:id])
    # @agency_admin.perform_add_agency_admin_validations = true
    # if @agency_admin.agency_admin_profile_image
    #   @profile_image = @agency_admin.agency_admin_profile_image.image_url
    #   @agency_admin_profile_image = @agency_admin.agency_admin_profile_image
    # else
    #   @profile_image = nil
    # end
  end

  def update_tenant
    @tenant = Tenant.find_by(id:params[:id])
    #@agency_admin.perform_add_agency_admin_validations = true
    if @tenant.update(tenant_params)
      flash[:success] = "You have successfully updated your profile information"
      redirect_to edit_tenant_path(@tenant)
    else
      flash[:danger] = "Sorry something went wrong. Please fix the fill in the information below."
      respond_to do |format|
        format.json {render :json=>{errors: @tenant.errors.to_hash(true).as_json}}
        format.html {render :edit}
      end 


    end
  end 


 
  

  def create
    
    
    
    
      email = params[:tenant][:email].gsub(/\s+/, "").downcase

      @user = User.find_by(email:email)

      
      if @user
        existing_role = @user.get_role("Tenant").present?
      end
      #look up property 
      @property = Property.find_by(id:params[:tenant][:property_id])
      
      

    # if params[:tenant][:name].empty? ,email:params[:tenant][:email],mobile:params[:tenant][:mobile]

      if @user && existing_role == false
        role = Role.new(user_id:@user.id)
        # @tenant = Tenant.create(user_id:@user.id,name:params[:tenant][:name],email:params[:tenant][:email],mobile:params[:tenant][:mobile], property_id:@property.id)
        @tenant = Tenant.new(user_id:@user.id,name:params[:tenant][:name],email:params[:tenant][:email],mobile:params[:tenant][:mobile], property_id:@property.id)
        # @tenant.roles << role
        # role.save

        if @tenant.save
          @tenant.roles << role
          role.save
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])

          respond_to do |format|
            format.json {render :json=>{message:"You have added a tenant to this maintenance request. Thank you for your time.", tenant:@tenant}}
            
          end
        else
          respond_to do |format|
            format.json {render :json=>{errors:@tenant.errors.to_hash(true).as_json}}
            
          end
        end 
        
        #@tenant.update_attribute(:property_id, @property.id)
         
        # @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])

        
      elsif @user && existing_role == true
      ###################################     
        # @maintenance_request.perform_uniqueness_validation_of_email = false
          @tenant = Tenant.find_by(user_id:@user.id)
          @tenant.update_columns(property_id: @property.id, mobile:params[:tenant][:mobile])
          
          @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])

          respond_to do |format|
            format.json {render :json=>{message:"You have added a tenant to this maintenance request. Thank you for your time.", tenant:@tenant}}
            
          end
          

      #########################
      else #This user does not exist
          #CREATE USER
          #@maintenance_request.perform_uniqueness_validation_of_email = true
          # @user = User.create(email:params[:tenant][:email], password:SecureRandom.hex(5))
          # role = Role.create(user_id:@user.id)
          # @tenant = Tenant.create(property_id:@property.id,user_id:@user.id, name:params[:tenant][:name],email:params[:tenant][:email], mobile:params[:tenant][:mobile] )
          # @tenant.roles << role
          
          # @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])
          #UserSetPasswordEmailWorker.perform_async(@user.id)



          @tenant = Tenant.new(name:params[:tenant][:name],email:params[:tenant][:email],mobile:params[:tenant][:mobile], property_id:@property.id)




          if @tenant.save

            @user = User.create(email:params[:tenant][:email], password:SecureRandom.hex(5))
            
            role = Role.new(user_id:@user.id)
            @tenant.roles << role
            role.save
            @tenant.update_attribute(:user_id, @user.id)
            @tenant_maintenance_request = TenantMaintenanceRequest.create(tenant_id:@tenant.id,maintenance_request_id:params[:tenant][:maintenance_request_id])
            respond_to do |format|
              format.json {render :json=>{message:"You have added a tenant to this maintenance request. Thank you for your time.", tenant:@tenant}}
              
            end
          else
            respond_to do |format|
              format.json {render :json=>{errors:@tenant.errors.to_hash(true).as_json}}
              
            end
          end 



      end 
      
      
      
     

      #EmailWorker.perform_in(5.minutes, @maintenance_request.id)

      #AgencyAdminOrAgentNewMaintenanceRequestNotificationTextingWorker.perform_async(@maintenance_request.id,the_url)

      
      
    
      # respond_to do |format|
      #   format.json {render :json=>{errors:@tenant.errors.to_hash(true).as_json}}
      #   format.html
      # end 
      

    
  end

  def update
    tenant = Tenant.find_by(id:params[:tenant][:id])  
    
    
    
    if tenant.update(tenant_params)
        
      
      respond_to do |format|
        format.json {render :json=>{tenant: tenant, :message=>"Tenant successfully edited." }}
      end 
    else
      respond_to do |format|
        format.json{render :json=>{errors:tenant.errors.to_hash(true).as_json}}
      end 
    end 
  end
  
  def destroy

    
    tenant_maintenance_request = TenantMaintenanceRequest.where(tenant_id:params[:tenant][:id], maintenance_request_id:params[:tenant][:maintenance_request_id]).first

    tenant_maintenance_request.destroy

    respond_to do |format|
      format.json{render :json=>{:message=>"The tenant has been removed from this maintenance request."}}
    end
    
  end



  def tenant_params
    params.require(:tenant).permit(:name, :email, :mobile, :property_id, :maintenance_request_id)
  end







end 