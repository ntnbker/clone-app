class LandlordMailer < ActionMailer::Base

  def send_landlord_maintenance_request(maintenance_request,landlord)
    @maintenance_request = maintenance_request
    @landlord = landlord
    mail from:"ron@email.com", to:landlord.email, subject:"Hi #{landlord.name} a maintenance request has been made"
  end

end 