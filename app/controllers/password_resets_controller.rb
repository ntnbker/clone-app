class PasswordResetsController < ApplicationController

  
  #caches_action :edit, :new

  def new
    
  end
  
  # request password reset.
  # you get here when the user entered his email in the reset password form and submitted it.
  def create 
    
    @user = User.find_by_email(params[:email].downcase)

    # This line sends an email to the user with instructions on how to reset their password (a url with a random token)
    if @user 
      # @user.deliver_reset_password_instructions!
      t = Time.now + 1.day
      @user.update_columns(reset_password_token_expires_at: t, reset_password_email_sent_at: Time.now, set_password_token: SecureRandom.hex(10))

      # First we should note the date that this request was made then we will add to the date by one day and save that.
      # We then need to check that the time between the reset password and the expiry date are still valid if they are then we let them stay in the change password form page if not then we need to redirect
      # to the home page where they can try again. We also need to check to make sure that they didnt already change the password. If they did then we need to make sure that we redirect them

      ResetPasswordEmailWorker.perform_async(@user.id)
    end

    # Tell the user instructions have been sent whether or not email was found.
    # This is to not leak information to attackers about which emails exist in the system.
    flash[:success] = 'Instructions have been sent to your email.'
    redirect_to root_path
  end

  # This is the reset password form.
  # def edit
  #   @token = params[:id]
  #   @user = User.load_from_reset_password_token(params[:id])

  #   if @user.blank?
  #     not_authenticated
  #     return
  #   end
  # end

  # # This action fires when the user has sent the reset password form.
  # def update
  #   @token = params[:id]
  #   @user = User.load_from_reset_password_token(params[:id])

  #   if @user.blank?
  #     not_authenticated
  #     return
  #   end

  #   # the next line makes the password confirmation validation work
  #   @user.password_confirmation = params[:user][:password_confirmation]
  #   # the next line clears the temporary token and updates the password
  #   if @user.change_password!(params[:user][:password])
  #     @user.update_attribute(:password_set, true)
  #     flash[:success] = 'Password was successfully updated.'
  #     redirect_to root_path
  #   else
  #     render :action => "edit"
  #   end
  # end
end
