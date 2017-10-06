class LandlordQuoteEmailWorker 
  include Sidekiq::Worker

  def perform(maintenance_request_id,landlord_id, quote_id)
    
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    landlord = Landlord.find_by(id:landlord_id)
    quote = Quote.find_by(id:quote_id)
    LandlordMailer.send_landlord_quote(maintenance_request, landlord, quote).deliver
    
  end


  
end 
