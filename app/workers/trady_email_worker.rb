class TradyEmailWorker 
  include Sidekiq::Worker

  def perform(trady_id,maintenance_request_id)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    trady = Trady.find(trady_id)
    TradyMailer.request_quote_email(trady,maintenance_request).deliver
    

  end


  
end 
