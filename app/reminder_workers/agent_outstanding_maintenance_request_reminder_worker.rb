class AgentOutstandingMaintenanceRequestReminderWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system



    agent = Agent.all

    agent.each do |agent|
      
        new_count = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Initiate Maintenance Request" }).distinct.count
        
        quote_requested_count = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Requested" }).distinct.count

        quote_recieved_count = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Recieved" }).distinct.count

        new_invoice_count = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"New Invoice" }).distinct.count

        cancelled_work_order_count = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Cancelled Work Order" }).distinct.count
    
        AgentMailer.agent_outstanding_maintenance_requests(agent, new_count, quote_requested_count, quote_recieved_count, new_invoice_count, cancelled_work_order_count).deliver
    end 

    
    


  end


  
end 
