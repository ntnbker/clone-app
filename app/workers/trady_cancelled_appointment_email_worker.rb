class TradyCancelledAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id)
    
    tenant = Tenant.find_by(id:tenant_id)
    TenantMailer.trady_cancelled_appointment_email(tenant).deliver
  end
end 