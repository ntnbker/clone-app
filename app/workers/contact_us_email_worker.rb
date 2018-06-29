

class ContactUsEmailWorker
  include Sidekiq::Worker

  def perform(name, email, message)
    
    

    
    MaintenanceAppMailer.contact_us(name, email, message).deliver
    

  end


  
end 
