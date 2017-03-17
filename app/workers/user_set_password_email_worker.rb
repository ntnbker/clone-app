class UserSetPasswordEmailWorker
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find_by(id:user_id)
    
    UserMailer.set_password_email(user).deliver
   end
end 
