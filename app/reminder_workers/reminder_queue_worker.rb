
require 'sidekiq-scheduler'

class ReminderQueueWorker
  include Sidekiq::Worker

  def perform
    

    # Run code if the date is 3 days more than when the last time this code ran 
    schedule = ReminderScheduler.first
    run_date = ReminderScheduler.first.run_date

    if Date.today >= run_date
       
      AgencyAdminOutstandingMaintenanceRequestReminderWorker.perform_async
      AgentOutstandingMaintenanceRequestReminderWorker.perform_async
      LandlordReminderAwaitingOwnerInitiationWorker.perform_async
      LandlordReminderAwaitingOwnerInstructionWorker.perform_async
      TradyAwaitingQuoteRequestNonAssignedMaintenanceRequestWorker.perform_async
      TradyAwaitingQuoteRequestAssignedMaintenanceRequestWorker.perform_async
      LandlordReminderQuoteRecievedAwaitingLandlordApprovalWorker.perform_async
      TradyReminderWorkOrderAssignedAppointmentRequiredWorker.perform_async
      TradyReminderTradyToConfirmAppointmentWorker.perform_async
      TenantReminderTenantToConfirmAppointmentWorker.perform_async
      LandlordReminderLandlordToConfirmAppointmentWorker.perform_async
      TradyReminderAwaitingInvoiceWorker.perform_async
      LandlordReminderRepairStatusWorker.perform_async

      schedule.update_attribute(:run_date, run_date + 4.days)
    else
      #do nothing

    end 
  end


  
end 
