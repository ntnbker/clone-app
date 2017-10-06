class NotifyAgentOfReassignedMaintenanceRequestEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id, user_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    user = User.find_by(id:user_id)
    AgentMailer.maintenance_request_reassigned_email(maintenance_request,user).deliver
    
    

  end
end 
