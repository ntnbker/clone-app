class Agent::AgentSendWorkOrderReminderWorker
  include Sidekiq::Worker

  def perform
    agent = Agent.all

    agent.each do |agent|
      maintenance_requests = MaintenanceRequest.all.where({ agent_id: agent.id}).joins(:action_status).where(:action_statuses => { :agent_status =>"Send Work Order" }).distinct
      maintenance_requests.each do |maintenance_request|
        AgentMailer.agent_send_work_order_reminder(maintenance_request).deliver
      end 
    end 

    
    


  end


  
end 
