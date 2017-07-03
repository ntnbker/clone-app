class TenantDeclinedLandlordAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(landlord_id)
    
    landlord = Landlord.find_by(id:landlord_id)
    LandlordMailer.tenant_declined_landlord_appointment_email(landlord).deliver
  end
end 