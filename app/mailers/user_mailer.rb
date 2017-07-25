class UserMailer < ActionMailer::Base
   default from: 'from@example.com'

  def reset_password_email(user)
    @user = User.find_by(id:user.id)
    
    @url  = edit_password_reset_url(@user.reset_password_token)
    mail(:to => user.email, :subject => "Password Reset - maintenanceapp")
  end


  def set_password_email(user)
    @user = User.find_by(id:user.id)
    
    mail(:to => user.email, :subject => "Password setup for - maintenanceapp")
  end
end 