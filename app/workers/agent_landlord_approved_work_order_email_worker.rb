

class AgentLandlordApprovedWorkOrderEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    
    
    
    AgentMailer.work_order_approved_by_landlord(maintenance_request).deliver
  end


  
end 
