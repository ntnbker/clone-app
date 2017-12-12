class AgencyAdminOutstandingMaintenanceRequestReminderWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system



    agency_admins = AgencyAdmin.all

    agency_admins.each do |agency_admin|
         
        new_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Initiate Maintenance Request" }).distinct.count
        
        quote_requested_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Requested" }).distinct.count

        quote_recieved_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Recieved" }).distinct.count

        send_work_order_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Send Work Order" }).distinct.count

        new_invoice_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"New Invoice" }).distinct.count

        cancelled_work_order_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Cancelled Work Order" }).distinct.count
    
        deferred_maintenance_request_count = MaintenanceRequest.all.where({ agency_admin_id: agency_admin.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Defer" }).distinct.count
        
        count = new_count + quote_requested_count + quote_recieved_count + send_work_order_count + new_invoice_count + cancelled_work_order_count + deferred_maintenance_request_count 

        if count > 0
          AgentMailer.agency_admin_outstanding_maintenance_requests(agency_admin, new_count, quote_requested_count, quote_recieved_count, new_invoice_count, cancelled_work_order_count, deferred_maintenance_request_count, send_work_order_count).deliver
        end 
    end 

    
    


  end


  
end 
