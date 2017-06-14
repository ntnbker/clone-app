class LandlordsController < ApplicationController
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
       respond_to do |format|
        if @landlord.valid?
           
          format.json {render json:@landlord, :notice=>"Landlord successfully created" }
          
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.create(user_id:@user.id)
          @landlord.roles << role
          
          property.update_attribute(:landlord_id, @user.landlord.id)
        else
          
          format.json{render json:@landlord.errors, :notice=>"Oops something went wrong" }
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
        format.json{render json:@landlord.errors, :notice=>"Oops something went wrong" }
      end
    end 
  end  



  def create_and_notify_landlord
    user = User.find_by(email:params[:landlord][:email])
    @landlord = Landlord.new(landlord_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
    property = maintenance_request.property
    
    if user && user.landlord?
      
      property.update_attribute(:landlord_id, user.landlord.id)
      
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], user.landlord.id )
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
      
      respond_to do |format|
        format.json {render json:user.landlord, notice:"Maintenance Request Successfully Sent" }
      end
    Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to landlord")
    elsif user && !user.landlord?
      respond_to do |format|
      format.json{render json: "User Email Already has other Role please user another email", status: :ok }
      end 
    else 
      
      respond_to do |format|
        if @landlord.valid?
           
          format.json {render json:@landlord, :notice=>"Maintenance Request Successfully Sent" }
          
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.create(user_id:@user.id)
          @landlord.roles << role
          
          property.update_attribute(:landlord_id, @user.landlord.id)

          LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
          maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 

          Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to landlord", name:@landlord.name)

        else
          format.json{render json:@landlord.errors, :notice=>"Oops something went wrong" }
        end
      end 
    end
  end 

  def update_and_notify_landlord
    @landlord = Landlord.find_by(id:params[:landlord][:id])  
    maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
    property = maintenance_request.property

    respond_to do |format|
      if @landlord.update(landlord_params)
        format.json {render json:@landlord, :notice=>"Landlord successfully created" }
        property.update_attribute(:landlord_id, @landlord.id)

        LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
        maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 

        Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to landlord", name:@landlord.name)

      else
        format.json{render json:@landlord.errors, :notice=>"Oops something went wrong" }
      end
    end 
  end 


  

  private

  def landlord_params
    params.require(:landlord).permit(:id,:user_id,:name,:email,:mobile, :maintenance_request_id)
  end
end 

















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
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], @landlord.id )
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
      Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to landlord")

    elsif existing_user && existing_role == true
      property.update_attribute(:landlord_id, existing_user.landlord.id)
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], existing_user.landlord.id )
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
      Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to landlord")
      respond_to do |format|
        format.json {render json:existing_user.landlord, notice:"Landlord successfully added" }
      end
    elsif existing_user == nil
       respond_to do |format|
        if @landlord.valid?
           
          format.json {render json:@landlord, :notice=>"Landlord successfully created" }
          
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.create(user_id:@user.id)
          @landlord.roles << role
          
          property.update_attribute(:landlord_id, @user.landlord.id)

          LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
          maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
          Log.create(maintenance_request_id:maintenance_request.id, action:"Maintenance request forwarded to landlord", name:@landlord.name)

        else
          
          format.json{render json:@landlord.errors, :notice=>"Oops something went wrong" }
        end
      end 
    end 



































