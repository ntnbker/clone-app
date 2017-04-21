class LandlordEmailWorker 
  include Sidekiq::Worker

  def perform(object_id,landlord_id)
    
    maintenance_request = MaintenanceRequest.find(object_id)

    landlord = Landlord.find_by(id:landlord_id)
    LandlordMailer.send_landlord_maintenance_request(maintenance_request, landlord).deliver
    

  end


  
end 
