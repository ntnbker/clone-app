class TradyMissingLicenseEmailWorker
  include Sidekiq::Worker

  def perform(trady_id)
    
    trady = Trady.find_by(id:trady_id)

    
    TradyMailer.trady_missing_license(trady).deliver
    

  end


  
end 
