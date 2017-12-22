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
      flash[:success] = 'Password was successfully set.'
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
    elsif params[:token]
      user = User.find_by(set_password_token:params[:token])
      if user
        @user = user
      else
        flash[:danger] = "Sorry that password token has expired. Please use the forgot my password link under the login screen to setup your password. Thank you."
        redirect_to root_path
      end 
    else 
      flash[:danger] = "Sorry you need an eligible token to see that page. Please use the forgot my password link under the login screen to setup your password. Thank you."
      redirect_to root_path
    end 
  end

  def confirm_password
    
    @user = User.find_by(email: params[:user][:email])
    @user.password_confirmation = params[:user][:password_confirmation]
    # the next line clears the temporary token and updates the password
    if @user.change_password!(params[:user][:password])
      @user.update_attribute(:set_password_token, SecureRandom.hex(10))
      flash[:success] = 'Your password was successfully set. Please continue to your maintenance request.'
      redirect_to root_path
    else
      flash[:danger] = "Sorry something is wrong. Please fix the fields to change the password."
      render :change_password
    end
  end

end 