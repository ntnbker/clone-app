class AgenyAdminOutstandingMaintenanceRequestReminderWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system
status_array = ["Inititate Maintenance Request", "Quote Requested", "Quote Recieved", "New Invoice", "Cancelled Work Order" ]
  


new_count = 0
  
quote_requested_count = 0

quote_recieved_count = 0

new_invoice_count = 0

cancelled_work_order_count = 0



    agency_admins = AgencyAdmin.all

    agency_admins.each do |agency_admin|
      
        new_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Inititate Maintenance Request" }).distinct.count
        
        quote_requested_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Requested" }).distinct.count

        quote_recieved_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Recieved" }).distinct.count

        new_invoice_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"New Invoice" }).distinct.count

        cancelled_work_order_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Cancelled Work Order" }).distinct.count
    
        AgentMailer.outstanding_maintenance_request(agency_admin, new_count, quote_requested_count, quote_recieved_count, new_invoice_count, cancelled_work_order_count).deliver
    end 

    
    


  end


  
end 
