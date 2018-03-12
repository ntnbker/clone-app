require 'digest/sha2'
class JfmoMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
   default from: 'info@sm.maintenanceapp.com.au'


  def tradie_quote_request
    
    mail(to:"martin@email.com", subject:"Quote request and MaintenanceApp network invitation.")
  end


  
end 