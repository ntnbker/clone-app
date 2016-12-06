class PagesController < ApplicationController
  def home
    @main_users = MainUser.all
    @service = Service.all
  end

  def route_user_type
    session[:customer_input] = params[:form_fields]
    
    if params[:form_fields][:main_user] == "Agent"
      redirect_to agency_admin_sign_up_path
    end 
  end
  

  def user_params
    params.require(:form_fields).permit(:main_user,:service)
  end

end 
