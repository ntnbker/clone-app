class LandlordMailer < ActionMailer::Base

  def send_landlord_maintenance_request(maintenance_request,landlord)
    @maintenance_request = maintenance_request
    @landlord = landlord
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a maintenance request has been made"
  end

  def send_landlord_quote(maintenance_request,landlord, quote)
    @maintenance_request = maintenance_request
    @landlord = landlord
    @quote = quote
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a quote has been send for a maintenance request job"
    
  end

end 