require 'digest/sha2'
class MaintenanceAppMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
   default from: 'info@sm.maintenanceapp.com.au'


  def find_me_a_tradie(maintenance_request)
    @maintenance_request = maintenance_request
    mail(:to => leon@maintenanceapp.com.au, :subject => "JFMO request from agency")
  end


  
end 