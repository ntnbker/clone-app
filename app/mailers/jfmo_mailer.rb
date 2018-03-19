require 'digest/sha2'
class JfmoMailer < ActionMailer::Base

  default "Message-ID"=>"#{Digest::SHA2.hexdigest(Time.now.to_i.to_s)}@sm.maintenanceapp.com.au"
   default from: 'info@sm.maintenanceapp.com.au'


  def tradie_quote_request(maintenance_request, trady)
    @trady = trady
    @maintenance_request = maintenance_request
    @property =@maintenance_request.property
    mail(to:@trady.email, subject:"Quote request for - #{@property.property_address}, sent on #{Date.today}")
  end


  
end 