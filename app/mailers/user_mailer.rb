require 'digest/sha2'
class UserMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
   default from: 'info@sm.maintenanceapp.com.au'


  def reset_password_email(user)
    @user = user
    
    # @url  = edit_password_reset_url(@user.reset_password_token)
    mail(:to => user.email, :subject => "Password Reset - maintenanceapp, sent on #{Date.today}")
  end


  def set_password_email(user)
    @user = User.find_by(id:user.id)
    
    mail(:to => user.email, :subject => "Password setup for - maintenanceapp, sent on #{Date.today}")
  end
end 