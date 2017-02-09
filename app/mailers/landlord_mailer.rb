class LandlordMailer < ActionMailer::Base

  def send_landlord_maintenance_request(maintenance_request,landlord)
    track user: landlord.user
    track extra: {maintenance_request_id:maintenance_request.id}
    @maintenance_request = maintenance_request
    @landlord = landlord
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a maintenance request has been made"
  end

  def send_landlord_quote(maintenance_request,landlord, quote)
    track user: landlord.user
    track extra: {maintenance_request_id:maintenance_request.id}
    @maintenance_request = maintenance_request
    @landlord = landlord
    @quote = quote
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a quote has been send for a maintenance request job"
    
  end

  

end 