


class JfmoEmailWorker
  include Sidekiq::Worker

  def perform(maintenance_request_id, trady_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    trady = Trady.find_by(id:trady_id)
    JfmoMailer.tradie_quote_request(maintenance_request, trady).deliver
  end


  
end 


