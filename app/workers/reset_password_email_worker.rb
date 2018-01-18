class ResetPasswordEmailWorker 
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find_by(id:user_id)
    UserMailer.reset_password_email(user).deliver

  end


  
end 


