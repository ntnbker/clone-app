class TradyReminderWorkOrderAssignedAppointmentRequiredWorker

  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system


    

    
     maintenance_requests = MaintenanceRequest.all.includes(:trady,:quotes,property:[:landlord]).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Approved Tradie To Organise Appointment" }).distinct


     maintenance_requests.each do |maintenance_request|
      
      property = maintenance_request.property
      trady = maintenance_request.trady
      maintenance_request = maintenance_request

      

          
            TradyMailer.reminder_work_order_assigned_appointment_required(maintenance_request, trady, property).deliver
          

      #LandlordMailer.reminder_quote_recieved_awaiting_landlord_approval(maintenance_request, landlord, property).deliver
     end 
    

  end


  
end 
