
require 'sidekiq-scheduler'

class SystemInvoicesServiceFeeCollectionWorker
  include Sidekiq::Worker

  def perform
    

    # Run code if the date is 3 days more than when the last time this code ran 

    Grab all invoices that have delivery_status = true and mapp_payment_status = Outstanding
    and come from trady that are jfmo_participants


    tradie_id_collection  = CustomerProfile.where.not(trady_id:nil).pluck(:id)
    
    invoices = Invoice.where(delivery_status:true, mapp_payment_status:"Outstanding", trady_id:tradie_id_collection)
    
  end


  
end 
