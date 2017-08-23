class NotifyTenantMaintenanceRequestSubmittedEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    TenantMailer.tenant_maintenace_request_submitted_by_agent(maintenance_request).deliver
  end

end 
