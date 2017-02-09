# class Email < Ahoy::Message
#   belongs_to :maintenance_request

#   after_update :update_the_agents_status_to_initiated, if: clicked_at_changed?

#   def self.all_maintenance_request_emails(maintenance_request_id)
#     self.where(:maintenance_request_id=>maintenance_request_id)
    
#   end

#   def update_the_agents_status_to_initiated
    
#     mr = self.maintenance_request
#       self.maintenance_request.action_status.update_attribute(:agent_status, "Awaiting Owner Instruction")
#   end

# end 