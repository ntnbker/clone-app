class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      
      format.html { redirect_to menu_login_path, :alert => exception.message }
    end
  end

  def customer_input_session
    
   @customer_input ||= Query.find(session[:customer_input]) unless session[:customer_input] == nil

  
  end


  def allow(role)
    if current_user.has_role(role) && current_user.logged_in_as(role)
      #do nothing 
    else
      flash[:notice] = "You are not authorized to see that page"
      redirect_to root_path
    end 
  end

  
  private
    def not_authenticated
      flash[:danger] = "Please login first"
      redirect_to menu_login_path
    end


end
