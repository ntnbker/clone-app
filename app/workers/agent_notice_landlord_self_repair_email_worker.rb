class AgentNoticeLandlordSelfRepairEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    
    AgentMailer.agent_notice_landlord_self_repair_email(maintenance_request).deliver
    

  end


  
end 
