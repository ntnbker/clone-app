
class TradyMissingInsuranceEmailWorker
  include Sidekiq::Worker

  def perform(trady_id)
    
    trady = Trady.find_by(id:trady_id)

    
    TradyMailer.trady_missing_insurance(trady).deliver
    

  end


  
end 
