class LandlordsController < ApplicationController

  def create

    
    
    user = User.find_by(email:params[:landlord][:email])
    @landlord = Landlord.new(landlord_params)
    if user && user.landlord?
      #send him the maintenance request by email if 
      
      LandlordEmailWorker.perform_async(params[:landlord][:maintenance_request_id], user.landlord.id )
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




