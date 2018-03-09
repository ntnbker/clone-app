
require 'sidekiq-scheduler'

class ServiceFeeWorker
  include Sidekiq::Worker

  def perform
    
    schedule = InvoiceScheduler.first
    run_date = InvoiceScheduler.first.run_date

    # Run code if the date is 3 days more than when the last time this code ran 
    
    if Date.today < run_date
      #do nothing 
    else
      SystemInvoicesServiceFeeCollectionWorker.perform_async
      UploadedInvoicesServiceFeeCollectionWorker.perform_async
      schedule.update_attribute(:run_date, run_date + 7.days)
    end 
  end


  
end 



