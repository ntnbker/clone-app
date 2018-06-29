require 'digest/sha2'
class MaintenanceAppMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
   default from: 'info@sm.maintenanceapp.com.au'


  def find_me_a_tradie(maintenance_request)
    @maintenance_request = maintenance_request
    
    mail(to:"martin@maintenanceapp.com.au", subject:"JFMO request from agency, sent on #{Date.today}")
  end

  def contact_us(name, email, message)
    @name = name
    @email = email
    @message = message

    
    mail(to:"martin@maintenanceapp.com.au", subject:"Inquiry")
  end


  
end 