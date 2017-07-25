class TenantCancelledAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id,maintenance_request_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    trady = Trady.find_by(id:trady_id)
    TradyMailer.tenant_cancelled_appointment_email(trady,maintenance_request).deliver
  end
end 