class PasswordsController < ApplicationController
  before_action :require_login, only:[:change_password]
  def edit
    
    @user = User.find_by(set_password_token:params[:password_token])
    @token = params[:password_token]
    if @user.blank?
      not_authenticated
      return
    end

    
  end

  # This action fires when the user has sent the reset password form.
  def update
    @token = params[:password_token]
    @user = User.find_by(set_password_token:params[:password_token])
    # @user_type = params[:user_type]
    if @user.blank?
      not_authenticated
      return
    end

    # the next line makes the password confirmation validation work
    @user.password_confirmation = params[:user][:password_confirmation]
    # the next line clears the temporary token and updates the password
    if @user.change_password!(params[:user][:password])
      @user.update_attribute(:set_password_token, SecureRandom.hex(10))
      flash[:success] = 'Password was successfully updated.'
      redirect_to menu_login_path
    else
      render :action => "edit"
    end
  end


  def change_password

    if current_user
      @user = current_user
    elsif params[:email]
      @user = User.find_by(email:params[:email])
    end 
      
  end

  def update_password
    @user = current_user
    @user.password_confirmation = params[:user][:password_confirmation]
    # the next line clears the temporary token and updates the password
    
    if @user.change_password!(params[:user][:password])
      @user.update_attribute(:set_password_token, SecureRandom.hex(10))
      flash[:success] = 'Password was successfully changed.'
      redirect_to change_password_path
    else
      flash[:danger] = "Sorry something is wrong. Please fix the fields to change the password"
      render :change_password
    end
  end 

  def set_password
    
    if current_user
      @user = current_user
    else 
      
      @user = User.find_by(set_password_token:params[:token])
      if @user
       #do nothing
      else
        flash[:danger] = "Sorry that password token has expired. Please use the forgot my password link under the login screen to setup your password. Thank you."
        redirect_to root_path
      end 
    end 
  end

  def confirm_password
    
    @user = User.find_by(email: params[:user][:email].gsub(/\s+/, "").downcase)
    @user.password_confirmation = params[:user][:password_confirmation]
    # the next line clears the temporary token and updates the password
    if @user.change_password!(params[:user][:password])
      
      @user.update_columns(set_password_token:SecureRandom.hex(10), password_set:true)
      flash[:success] = 'Your password was successfully set. Please continue to your maintenance request.'
      redirect_to root_path
    else
      flash[:danger] = "Sorry something is wrong. Please fix the fields to change the password."
      render :change_password
    end
  end


  def new_onboarding_password
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    if params[:token]
      user = User.find_by(set_password_token:params[:token])
      if user
        @user = user
      else
        flash[:danger] = "Sorry that password token has expired. This means that you have already setup your password. If you have forgotten your password please us the Forget Password link."
        redirect_to root_path
      end 
    else 
      flash[:danger] = "Sorry you need an eligible token to see that page. Please use the forgot my password link under the login screen to setup your password. Thank you."
      redirect_to root_path
    end 
  end

  def create_onboarding_password
    @user = User.find_by(email: params[:user][:email].gsub(/\s+/, "").downcase)
    @user.password_confirmation = params[:user][:password_confirmation]
    # the next line clears the temporary token and updates the password
    if @user.change_password!(params[:user][:password])
      
      @user.update_columns(set_password_token:SecureRandom.hex(10), password_set:true)
      @user.trady.update_attribute(:jfmo_participant, true)
      flash[:success] = 'Your password was successfully set. Please pick the services you will be providing to your customers.'



      # login(@user.email, params[:user][:password].gsub(/\s+/, ""))
      # @user.current_role.update_attribute(:role, "Trady")
      redirect_to new_service_onboarding_path(maintenance_request_id:params[:user][:maintenance_request_id], trady_id:params[:user][:trady_id])
    else
      flash[:danger] = "Sorry something is wrong. Please fix the fields to change the password."
      
      respond_to do |format|
        format.json {render :json=>{errors:@user.errors.to_hash(true).as_json}}
        format.html {render :new_onboarding_password}
      end 
    end
  end


end 