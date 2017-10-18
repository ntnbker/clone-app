
require 'sidekiq-scheduler'

class ReminderQueueWorker
  include Sidekiq::Worker

  def perform
    

    agent_type = ["AgencyAdmin", "Agent"]

    


  end


  
end 
