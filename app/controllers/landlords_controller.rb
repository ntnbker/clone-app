class LandlordsController < ApplicationController
  before_action :require_login, only:[:create,:update,:create_and_notify_landlord, :update_and_notify_landlord]
  
  #before_action(only:[:show,:index]) {allow("AgencyAdmin")}

  def create
    
    @landlord = Landlord.new(landlord_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
    property = maintenance_request.property
    
    existing_user = User.find_by(email:params[:landlord][:email])
    if existing_user
      existing_role = existing_user.get_role("Landlord").present?
    end 
    if existing_user && existing_role == false
      role = Role.new(user_id:existing_user.id)
      @landlord = Landlord.create(landlord_params)
      @landlord.update_attribute(:user_id,existing_user.id)
      @landlord.roles << role
      role.save
      property.update_attribute(:landlord_id, existing_user.landlord.id)

    elsif existing_user && existing_role == true
      property.update_attribute(:landlord_id, existing_user.landlord.id)
      
      respond_to do |format|
        format.json {render json:existing_user.landlord, notice:"Landlord successfully added" }
      end
    elsif existing_user == nil
       
        if @landlord.valid?
           respond_to do |format|
            format.json {render json:@landlord, :notice=>"Landlord successfully created" }
            end
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.create(user_id:@user.id)
          @landlord.roles << role
          
          property.update_attribute(:landlord_id, @user.landlord.id)
          UserSetPasswordEmailWorker.perform_async(@user.id)
        else
          respond_to do |format|
            format.json{render :json=>{errors:@landlord.errors.to_hash(true).as_json}}
          end 
        end
    end 
  end 

  

  def update
    @landlord = Landlord.find_by(id:params[:landlord][:id])  
    
    respond_to do |format|
      if @landlord.update(landlord_params)
        format.json {render json:@landlord, :notice=>"Landlord successfully created" }
      else
        format.json{render :json=>{errors:@landlord.errors.to_hash(true).as_json} }
      end
    end 
  end  



  def create_and_notify_landlord
    user = User.find_by(email:params[:landlord][:email])
    @landlord = Landlord.new(landlord_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
    property = maintenance_request.property
    
    if user
      existing_role = user.get_role("Landlord").present?
    end
    
    if user && existing_role == false
      role = Role.new(user_id:user.id)
      @landlord.roles << role
      role.save
      @landlord.user_id = user.id
      @landlord.save
      property.update_attribute(:landlord_id, user.landlord.id)

      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
      log = Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to - Landlord: ", name:@landlord.name.capitalize)
      respond_to do |format|
        format.json {render :json=> {landlord:user.landlord,log:log, notice:"Maintenance Request Successfully Sent"} }
      end


    elsif user && existing_role == true
      property.update_attribute(:landlord_id, user.landlord.id)
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],user.landlord.id)
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
      log = Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to - Landlord: ", name:user.landlord.name.capitalize)
      respond_to do |format|
        format.json {render :json=>{landlord: user.landlord,log:log, notice:"Maintenance Request Successfully Sent" }}
      end
    else 
      if @landlord.valid?
           
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.new(user_id:@user.id)
          @landlord.roles << role
          role.save
          property.update_attribute(:landlord_id, @user.landlord.id)

          LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
          UserSetPasswordEmailWorker.perform_in(5.minutes, @user.id)
          maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 

          log = Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to - Landlord ", name:@landlord.name.capitalize)
        respond_to do |format|
          format.json {render :json=>{landlord:@user.landlord,log:log, notice:"Maintenance Request Successfully Sent" }}
        end
      else
        @user = User.new(user_params)  
        respond_to do |format|
          format.json{render :json=>{errors:@landlord.errors.to_hash(true).as_json}}
        end 
      end 
    end 
  end 

  def update_and_notify_landlord
    @landlord = Landlord.find_by(id:params[:landlord][:id])  
    maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
    property = maintenance_request.property

    if @landlord.update(landlord_params)
        
      property.update_attribute(:landlord_id, @landlord.id)

      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 

      log =  Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to - Landlord:", name:@landlord.name.capitalize)
      respond_to do |format|
        format.json {render :json=>{landlord: @landlord,log:log, :notice=>"Landlord successfully created" }}
      end 
    else
      respond_to do |format|
        format.json{render :json=>{errors:@landlord.errors.to_hash(true).as_json}}
      end 
    end 
  end 


  

  private

  def landlord_params
    params.require(:landlord).permit(:id,:user_id,:name,:email,:mobile, :maintenance_request_id)
  end
end 

















    



































