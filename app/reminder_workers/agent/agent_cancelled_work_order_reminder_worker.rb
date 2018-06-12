class Agent::AgentCancelledWorkOrderReminderWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system



    agent = Agent.all

    agent.each do |agent|
      maintenance_requests = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Cancelled Work Order" }).distinct
      maintenance_requests.each do |maintenance_request|
        AgentMailer.agent_cancelled_work_order_reminder(maintenance_request).deliver
      end 
    end 

    
    


  end


  
end 
