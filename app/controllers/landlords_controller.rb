class LandlordsController < ApplicationController

  def create
    
    
    user = User.find_by(email:params[:landlord][:email])
    @landlord = Landlord.new(landlord_params)
    if user && user.landlord?
      #send him the maintenance request by email
      
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], user.landlord.id )
    elsif !user 
      if @landlord.valid?
        @user = User.create(email:params[:landlord][:email],password:SecureRandom.hex(5))
        @landlord.user_id = @user.id
        @landlord.save
        role = Role.create(user_id:@user.id)
        @landlord.roles << role
        LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id],@landlord.id)
        # maintenance_request = MaintenanceRequest.find_by(id:params[:landlord][:maintenance_request_id])
        # maintenance_request.update_attribute(landlord_id) = @tenant.id

      else


      end

      
    else 
      flash[:danger] = "Sorry that email is not a landlords emails"
      redirect_to root_path
      #add Role 
       
      

    end 


  end

  private

  def landlord_params
    params.require(:landlord).permit(:user_id,:name,:email,:mobile, :maintenance_request_id)
  end
end 






