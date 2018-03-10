class FindTradieEmailWorker 
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    MaintenanceAppMailer.find_me_a_tradie(maintenance_request).deliver
  end


  
end 


