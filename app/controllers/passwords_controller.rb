class PasswordsController < ApplicationController

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
end 