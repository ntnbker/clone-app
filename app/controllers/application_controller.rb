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

  def require_role
    #if the current_user does not have a role log them out and let them know that their session expired and to log in again.
    if current_user.has_current_role?
      #do nothing
    else
      logout
      flash[:danger] = "Sorry your session has expired please log in."
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'Sorry your session has expired please log in.' }
        format.json { redirect_to root_path, notice: 'Sorry your session has expired please log in.' }
      end 
    end 

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
    elsif current_user
      user = current_user
      token = user.set_password_token
    end 

      if user 
        if user.password_set
          # if current_user
          #   #do nothing 
          # else
          #   flash[:message] = "Please log in to gain access."
          #   redirect_to root_path(user_type:params[:user_type], maintenance_request_id:params[:id], anchor:params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id], appointment_id:params[:appointment_id], stop_reminder:params[:stop_reminder], quote_request_id:params[:quote_request_id],role:params[:role] )
          # end 

        else
          flash[:message] = "Notice: You must first setup a password before you can access any maintenance request. Thank you for your time."
          redirect_to set_password_path(token:token)
        end
      else
        flash[:message] = "Please log in to gain access."
        redirect_to root_path(user_type:params[:user_type], maintenance_request_id:params[:id], anchor:params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id], appointment_id:params[:appointment_id], stop_reminder:params[:stop_reminder], quote_request_id:params[:quote_request_id],role:params[:role] )
       
      end 
     


  end


  def jfmo_terms_and_conditions
    if current_user && current_user.logged_in_as("Trady") && current_user.trady.jfmo_participant == true && current_user.trady.customer_profile.nil?
      flash[:danger] = "Please accept the terms and conditions to continue."
      redirect_to  join_just_find_me_one_path(trady_id:current_user.trady.id)
    
    elsif  current_user && current_user.logged_in_as("Trady") && current_user.trady.jfmo_participant == true && current_user.trady.registration_status == "Pending"
      if  current_user.trady.insurance == nil
        flash[:danger] = "Oops it appears we are missing some important information. Please upload your insurance information to continue. We will quickly verify your information and then you can start taking receiving jobs, thank you for your time."
        redirect_to  new_insurance_onboarding_path
      elsif  current_user.trady.license == nil
        flash[:danger] = "Oops it appears we are missing some important information. You would like to receive jobs that require you to be a licensed professional, Please upload your license information to continue thank you for your time."
        redirect_to new_license_onboarding_path

      elsif  current_user.trady.license.licensed == nil && current_user.trady.insurance.insured == nil
        flash[:danger] = "We are still reviewing your registration please be patient while we check everything."
        redirect_to root_path
      elsif  current_user.trady.license.licensed == false 
        flash[:danger] = "We are still reviewing your registration please be patient while we check everything."
        redirect_to root_path
      elsif  current_user.trady.insurance.insured == false 
        flash[:danger] = "We are still reviewing your registration please be patient while we check everything."
        redirect_to root_path
      
        
      end 
    elsif  current_user && current_user.logged_in_as("Trady") && current_user.trady.jfmo_participant == true && current_user.trady.registration_status == "Incomplete"
      if  current_user.trady.insurance == nil
        flash[:danger] = "Oops it appears we are missing some important information. Please upload your insurance information to continue. We will quickly verify your information and then you can start taking receiving jobs, thank you for your time."
        redirect_to  new_insurance_onboarding_path
      elsif current_user.trady.insurance.insured == false
        flash[:danger] = "Oops it appears you have submitted invalid insurance information. Please upload valid insurance information to continue. We will quickly verify your information and then you can start taking receiving jobs, thank you for your time."
        redirect_to  edit_insurance_onboarding_path(current_user.trady.insurance)
      elsif current_user.trady.license == nil
        flash[:danger] = "Oops it appears we are missing some important information. You would like to receive jobs that require you to be a licensed professional, Please upload your license information to continue thank you for your time."
        redirect_to new_license_onboarding_path
      elsif current_user.trady.license.licensed == false
        flash[:danger] = "Oops it appears you have submitted invalid license information. If you would like to receive jobs that require you to be a licensed professional, Please upload your license information to continue thank you for your time."
        redirect_to edit_license_onboarding_path(current_user.trady.license)
      end 





    elsif  current_user && current_user.logged_in_as("Trady") && current_user.trady.jfmo_participant == true && current_user.trady.skills.count == 0
      #flash[:danger] = "Please add a service you provide to continue."
      #redirect to add service place
    else
      #do nothing

    end 
    #always block until approved pending approved declined 
  end


  
  private
    def not_authenticated
      flash[:danger] = "Please log in to gain access."
      

      respond_to do |format|
        format.html { redirect_to root_path, notice: 'Please log in to gain access.' }
        format.json { redirect_to root_path, notice: 'Please log in to gain access.' }
      end 
    end


end