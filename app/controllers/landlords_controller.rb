class LandlordsController < ApplicationController

  def create
    
    user = User.find_by(email:params[:landlord][:email])
    @landlord = Landlord.new(landlord_params)
    property = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id]).property
    
    if user 
      #send him the maintenance request by email if 
      if property.landlord_id == nil 
        property.update_attribute(:landlord_id, user.landlord.id)
      end 
      
      #LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], user.landlord.id )
    
    else 
      
      respond_to do |format|
        if @landlord.valid?
          # format.html {render "agent_maintenance_requests/show.html.haml", :notice =>"Your message was sent"}  
          format.html {render "maintenance_requests/show.html.haml" , :notice =>"Your message was sent"}  
          format.js{render layout: false, content_type: 'text/javascript'}
        
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.create(user_id:@user.id)
          @landlord.roles << role
          #LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
          
          
          if property.landlord_id == nil 
            property.update_attribute(:landlord_id, @user.landlord.id)
          end 
          #redirect_to maintenance_request_path(id:params[:landlord][:maintenance_request_id])
        else
          format.html { render "maintenance_requests/show.html.haml", :notice =>"Please fill out the form" }
          format.js{}

        end
      end 

      
   
       
       
      

    end 
  end

  def create_and_notify_landlord
    user = User.find_by(email:params[:landlord][:email])
    @landlord = Landlord.new(landlord_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
    property = maintenance_request.property
    
    if user && user.landlord?
      #send him the maintenance request by email if 
      if property.landlord_id == nil 
      property.update_attribute(:landlord_id, user.landlord.id)
      end 
      
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], user.landlord.id )
      maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
      
    elsif !user 
      
      respond_to do |format|
        if @landlord.valid?
          format.html {render "agent_maintenance_requests/show.html.haml", :notice =>"Your message was sent"}  
          format.js{render layout: false, content_type: 'text/javascript'}
        
          @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
          @landlord.user_id = @user.id
          @landlord.save
          role = Role.create(user_id:@user.id)
          @landlord.roles << role
          LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
          maintenance_request.action_status.update_columns(maintenance_request_status:"In Progress", agent_status:"Awaiting Owner Initiation",action_category:"Awaiting Action") 
          
          if property.landlord_id == nil 
            property.update_attribute(:landlord_id, @user.landlord.id)
          end 
          
        else
          format.html { render "agent_maintenance_requests/show.html.haml", :notice =>"Please fill out the form" }
          format.js{}

        end
      end 

      
    else 
      flash[:danger] = "Sorry that email is not a landlords emails"
      redirect_to root_path
       
    end
  end 

  private

  def landlord_params
    params.require(:landlord).permit(:user_id,:name,:email,:mobile, :maintenance_request_id)
  end
end 




