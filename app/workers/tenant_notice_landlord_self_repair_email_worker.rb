





class TenantNoticeLandlordSelfRepairEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id, landlord_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    landlord = Landlord.find_by(id:landlord_id)
    
    TenantMailer.tenant_notice_landlord_self_repair_email(maintenance_request, landlord).deliver
    

  end


  
end 
