
require 'sidekiq-scheduler'

class ServiceFeeWorker
  include Sidekiq::Worker

  def perform
    

    # Run code if the date is 3 days more than when the last time this code ran 
    if Date.today < run_date
      #do nothing 
    else
      SystemInvoicesServiceFeeCollectionWorker.perform_async
      #UploadedInvoicesServiceFeeCollectionWorker.perform_async
    end 
  end


  
end 
