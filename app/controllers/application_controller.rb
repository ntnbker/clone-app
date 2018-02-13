class ApplicationController < ActionController::Base
  
  # include ActionController::Caching::Sweeping


  protect_from_forgery with: :exception
  helper_method :profile_and_company_avatar
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      
      format.html { redirect_to menu_login_path, :alert => exception.message }
    end
  end

  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    respond_to do |format|
      
      format.html { redirect_to root_path, :danger => "Sorry something went wrong. Please try again." }
    end
  end




  def customer_input_session
    
   @customer_input ||= Query.find(session[:customer_input]) unless session[:customer_input] == nil

  
  end


  def allow(role)
    if current_user.has_role(role) && current_user.logged_in_as(role)
      #do nothing 
    else
      flash[:danger] = "You are not authorized to see that page. Please sign into your own account."
      redirect_to root_path
    end 
  end

  def profile_and_company_avatar
    if current_user
      if current_user.logged_in_as("AgencyAdmin")
        if current_user.agency_admin.agency_admin_profile_image
          @profile_avatar = current_user.agency_admin.agency_admin_profile_image.image_url
        end 
        if current_user.agency_admin.agency.agency_profile_image
          @company_logo = current_user.agency_admin.agency.agency_profile_image.image_url
        end 
      elsif current_user.logged_in_as("Agent")
        if current_user.agent.agent_profile_image
          @profile_avatar = current_user.agent.agent_profile_image.image_url
        end 

        if current_user.agent.agency.agency_profile_image
          @company_logo = current_user.agent.agency.agency_profile_image.image_url
        end 
      elsif current_user.logged_in_as("Trady")
        if current_user.trady.trady_profile_image
          @profile_avatar = current_user.trady.trady_profile_image.image_url
        end 
        if current_user.trady.trady_company && current_user.trady.trady_company.trady_company_profile_image
          @company_logo = current_user.trady.trady_company.trady_company_profile_image.image_url
        end 
      end 
    end 
    array = [profile:@profile_avatar, logo:@company_logo]
    return array
  end

  def email_redirect
    
    if params[:user_id]
      user = User.find_by(id:params[:user_id])
      token = user.set_password_token
    elsif params[:email]
      user = User.find_by(email:params[:email])
      token = user.set_password_token
    else
      if current_user
        user = current_user
        token = user.set_password_token
      end 
    end 

    if user 
      if user.password_set
        if current_user
          #do nothing 
        else
          flash[:message] = "To view the maintenance request please login. Once logged in you will be directed towards the maintenance request of interest."
          redirect_to menu_login_path(user_type:params[:user_type], maintenance_request_id:params[:id], anchor:params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id])
        end 

      else
        flash[:message] = "Notice: You must first setup a password before you can access any maintenance request. Thank you for your time."
        redirect_to set_password_path(token:token)
      end 

    else
      flash[:danger] = "Sorry you dont have access to that. Please login in to see that."
      redirect_to root_path
    end 


  end

  
  private
    def not_authenticated
      flash[:danger] = "Please login first"
      redirect_to menu_login_path
    end


end
