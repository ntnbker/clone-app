

class LandlordMessageEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)

    
    LandlordMailer.notify_landlord_about_message(maintenance_request).deliver
    

  end


  
end 
