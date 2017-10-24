
require 'sidekiq-scheduler'

class ReminderQueueWorker
  include Sidekiq::Worker

  def perform
    

    AgenyAdminOutstandingMaintenanceRequestReminderWorker.perform_async
    AgentOutstandingMaintenanceRequestReminderWorker.perform_async
    LandlordReminderAwaitingOwnerInitiationWorker.perform_async
    LandlordReminderAwaitingOwnerInstructionWorker.perform_async
    TradyAwaitingTradieInitiationWorker.perform_async

  end


  
end 
