class MaintenanceRequestsController < ApplicationController
  before_action :require_login, only:[:show]
  before_action :set_guest_user, only:[:new,:create]
  load_and_authorize_resource
  
  def new

    
    
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
    @customer_input = Query.find_by(id:session[:customer_input])
    

  end

  def create
    
    @customer_input = Query.find_by(id:session[:customer_input])
    @maintenance_request = MaintenanceRequest.new(maintenance_request_params)
    
    if @maintenance_request.valid?
      if current_user.agent? || current_user.agency_admin?
        @maintenance_request.agent_id = current_user.role.roleable_id
      end 
      if User.exists?(email:params[:maintenance_request][:email])
        @maintenance_request.perform_uniqueness_validation_of_email = false
        user = User.find_by(email:params[:maintenance_request][:email]).id
        @tenant = Tenant.find_by(user_id:user)
        @maintenance_request.tenant_id = @tenant.id
        @maintenance_request.save 
        #then add it to the tenants requests by finding the tenant through their email
         
      else
        @maintenance_request.perform_uniqueness_validation_of_email = true
        @user = User.create(email:params[:maintenance_request][:email], password:SecureRandom.hex(5))
        tenant = Tenant.create(user_id:@user.id)
        
        @maintenance_request.save
        
      end 
      
      

      @customer_input.update_attribute(:maintenance_request_id,@maintenance_request.id)
      EmailWorker.perform_async(@maintenance_request.id)
      redirect_to maintenance_request_path(@maintenance_request)
      
      
      flash[:success]= "Thank You"
    else
      flash[:danger]= "something went wrong"
      render :new
      
    end 
    
  end

  def show
    @maintenance_request = MaintenanceRequest.find_by(id:params[:id])
  end


  private

  def maintenance_request_params
    params.require(:maintenance_request).permit(:name,:email,:mobile,:maintenance_heading,:agent_id,:tenant_id,:tradie_id,:maintenance_description,:image,:availability,:access_contact,:real_estate_office, :agent_email, :agent_name, :agent_mobile,:person_in_charge ,availabilities_attributes:[:id,:maintenance_request_id,:date,:start_time,:finish_time,:available_only_by_appointment,:_destroy],access_contacts_attributes: [:id,:maintenance_request_id,:relation,:name,:email,:mobile,:_destroy])
  end

  def set_guest_user
    
    
    login("martin@maintenanceapp.com.au", 12345)
    
  end

 

end 



