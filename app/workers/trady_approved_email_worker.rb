class TradyApprovedEmailWorker
  include Sidekiq::Worker

  def perform(trady_id)
    
    trady = Trady.find_by(id:trady_id)

    
    TradyMailer.trady_registration_approved(trady).deliver
    

  end


  
end 
