class TenantCancelledAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id)
    
    trady = Trady.find_by(id:trady_id)
    TradyMailer.tenant_cancelled_appointment_email(trady).deliver
  end
end 