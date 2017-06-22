class UserMailer < ActionMailer::Base
   default from: 'from@example.com'

  def reset_password_email(user)
    @user = User.find_by(id:user.id)
    
    @url  = edit_password_reset_url(@user.reset_password_token)
    mail(:to => user.email,:subject => "Reset Password")
  end


  def set_password_email(user,user_type)
    @user = User.find_by(id:user.id)
    @user_type = user_type
    mail(:to => user.email, :subject => "Setup Password")
  end
end 