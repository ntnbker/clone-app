class TradyCancelledAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id,trady_id,maintenance_request_id)
    
    tenant = Tenant.find_by(id:tenant_id)
    trady = Trady.find_by(id:trady_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    TenantMailer.trady_cancelled_appointment_email(tenant,trady,maintenance_request).deliver
  end
end 