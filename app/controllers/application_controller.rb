class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :profile_and_company_avatar
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      
      format.html { redirect_to menu_login_path, :alert => exception.message }
    end
  end

  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    respond_to do |format|
      
      format.html { redirect_to root_path, :alert => "Sorry something went wrong. Please try again." }
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

  def profile_and_company_avatar
    if current_user
      if current_user.logged_in_as("AgencyAdmin")
        @profile_avatar = current_user.agency_admin.agency_admin_profile_image.image_url
        @company_logo = current_user.agency_admin.agency.agency_profile_image.image_url
      elsif current_user.logged_in_as("Agent")
        @profile_avatar = current_user.agent.agent_profile_image.image_url
        @company_logo = current_user.agent.agency.agency_profile_image.image_url
      elsif current_user.logged_in_as("Trady")
        @profile_avatar = current_user.trady.trady_profile_image.image_url
        if current_user.trady.trady_company
          @company_logo = current_user.trady.trady_company.trady_company_profile_image.image_url
        end 
      end 

          
    end 
  end

  
  private
    def not_authenticated
      flash[:danger] = "Please login first"
      redirect_to menu_login_path
    end


end
