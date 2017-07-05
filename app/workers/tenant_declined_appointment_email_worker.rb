class TenantDeclinedAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id)
    
    trady = Trady.find_by(id:trady_id)
    TradyMailer.tenant_declined_appointment_email(trady).deliver
  end
end 