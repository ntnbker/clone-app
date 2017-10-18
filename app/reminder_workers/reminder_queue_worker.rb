
require 'sidekiq-scheduler'

class ReminderQueueWorker
  include Sidekiq::Worker

  def perform
    

    AgenyAdminOutstandingMaintenanceRequestReminderWorker.perform_async

    


  end


  
end 
