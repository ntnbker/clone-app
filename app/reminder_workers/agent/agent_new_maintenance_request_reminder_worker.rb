class Agent::AgentNewMaintenanceRequestReminderWorker
  include Sidekiq::Worker

  def perform
    agent = Agent.all

    agent.each do |agent|
      maintenance_requests = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Initiate Maintenance Request" }).distinct
      maintenance_requests.each do |maintenance_request|
        AgentMailer.agent_new_maintenance_request_reminder(maintenance_request).deliver
      end 
    end 

    
    


  end


  
end 
