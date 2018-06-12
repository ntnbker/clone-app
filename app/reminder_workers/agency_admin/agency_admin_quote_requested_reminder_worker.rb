class AgencyAdmin::AgencyAdminQuoteRequestedReminderWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system



    agency_admins = AgencyAdmin.all

    agency_admins.each do |agency_admin|
         
        maintenance_requests = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Requested" }).distinct
        
        maintenance_requests.each do |maintenance_request|
        
          AgentMailer.agency_admin_quote_requested_reminder(maintenance_request).deliver
        end 
    end 

    
    


  end


  
end 
