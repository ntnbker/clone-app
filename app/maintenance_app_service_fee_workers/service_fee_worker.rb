
require 'sidekiq-scheduler'

class ServiceFeeWorker
  include Sidekiq::Worker

  def perform
    

    # Run code if the date is 3 days more than when the last time this code ran 

    SystemInvoicesServiceFeeCollectionWorker.perform_async
    UploadedInvoicesServiceFeeCollectionWorker.perform_async
    
  end


  
end 
