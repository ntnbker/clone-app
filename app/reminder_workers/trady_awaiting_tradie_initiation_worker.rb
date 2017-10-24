TradyAwaitingTradieInitiationWorkerLandlordReminderAwaitingOwnerInstructionWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system


    

    
     maintenance_requests = MaintenanceRequest.all.includes(:quote_requests).joins(:action_status).where(:action_statuses => { :agent_status =>"Awaiting Tradie Initiation" }).joins(:quotes).where(:quotes=>{:status=>"Active"} ).distinct


     maintenance_requests.each do |maintenance_request|
      landlord = maintenance_request.property.landlord
      property = maintenance_request.property
      maintenance_request = maintenance_request
      LandlordMailer.reminder_awaiting_owner_instruction(maintenance_request, landlord, property).deliver
     end 
    

  end


  
end 
