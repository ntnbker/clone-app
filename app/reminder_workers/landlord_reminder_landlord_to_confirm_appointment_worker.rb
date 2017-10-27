



class LandlordReminderLandlordToConfirmAppointmentWorker


  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system
    
    

    
     


     
     maintenance_requests = MaintenanceRequest.all.includes(:tenants,property:[:landlord]).joins(:action_status).where(:action_statuses => { :agent_status =>"Landlord To Confirm Appointment" }).distinct


     maintenance_requests.each do |maintenance_request|
      tenant = maintenance_request.tenants.first
      landlord = maintenance_request.property.landlord
      property = maintenance_request.property
      maintenance_request = maintenance_request
      LandlordMailer.reminder_landlord_to_confirm_appointment(maintenance_request, landlord, property, tenant).deliver
     end 
    

    

  end


  
end 
