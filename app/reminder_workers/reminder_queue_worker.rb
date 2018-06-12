
require 'sidekiq-scheduler'

class ReminderQueueWorker
  include Sidekiq::Worker

  def perform
    

    # Run code if the date is 3 days more than when the last time this code ran 
    schedule = ReminderScheduler.first
    run_date = ReminderScheduler.first.run_date

    if Date.today >= run_date
      AgencyAdmin::AgencyAdminCancelledWorkOrderReminderWorker.perform_async
      AgencyAdmin::AgencyAdminNewInvoiceReminderWorker.perform_async
      AgencyAdmin::AgencyAdminNewMaintenanceRequestReminderWorker.perform_async
      AgencyAdmin::AgencyAdminQuoteReceivedReminderWorker.perform_async
      AgencyAdmin::AgencyAdminQuoteRequestedReminderWorker.perform_async
      AgencyAdmin::AgencyAdminSendWorkOrderReminderWorker.perform_async
      AgencyAdmin::AgencyAdminOutstandingMaintenanceRequestReminderWorker.perform_async
      
      Agent::AgentOutstandingMaintenanceRequestReminderWorker.perform_async
      Agent::AgentCancelledWorkOrderReminderWorker.perform_async
      Agent::AgentNewInvoiceReminderWorker.perform_async
      Agent::AgentNewMaintenanceRequestReminderWorker.perform_async
      Agent::AgentQuoteReceivedReminderWorker.perform_async
      Agent::AgentQuoteRequestedReminderWorker.perform_async
      Agent::AgentSendWorkOrderReminderWorker.perform_async
      
      LandlordReminderAwaitingOwnerInitiationWorker.perform_async
      LandlordReminderAwaitingOwnerInstructionWorker.perform_async
      LandlordReminderLandlordToConfirmAppointmentWorker.perform_async
      LandlordReminderQuoteRecievedAwaitingLandlordApprovalWorker.perform_async
      LandlordReminderRepairStatusWorker.perform_async
      
      TradyReminderWorkOrderAssignedAppointmentRequiredWorker.perform_async
      TradyAwaitingQuoteRequestNonAssignedMaintenanceRequestWorker.perform_async
      TradyAwaitingQuoteRequestAssignedMaintenanceRequestWorker.perform_async
      TradyReminderAwaitingInvoiceWorker.perform_async
      
      
      
      

      schedule.update_attribute(:run_date, run_date + 4.days)
    else
      #do nothing

    end 
  end


  
end 
