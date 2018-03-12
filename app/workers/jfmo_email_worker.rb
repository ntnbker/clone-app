


class JfmoEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    JfmoMailer.tradie_quote_request(maintenance_request).deliver
  end


  
end 


