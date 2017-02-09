module Ahoy
  class Message < ActiveRecord::Base

    self.table_name = "ahoy_messages"

    belongs_to :user, AhoyEmail.belongs_to.merge(polymorphic: true)
    

    belongs_to :maintenance_request
    after_update :update_the_agents_status_to_initiated, if: :clicked_at_changed?
    after_update :update_agents_status_to_awaiting_quote, if: :clicked_at_changed?  
    # after_create :update_type

  def self.all_maintenance_request_emails(maintenance_request_id)
    self.where(:maintenance_request_id=>maintenance_request_id)
    
  end

  def update_the_agents_status_to_initiated
    
    mr = self.maintenance_request
    self.maintenance_request.action_status.update_attribute(:agent_status, "Awaiting Owner Instruction")
  end

  def update_agents_status_to_awaiting_quote
    if mailer == 'TradyMailer#request_quote_email'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Awaiting Quote")
    end 
  end





  end
end

