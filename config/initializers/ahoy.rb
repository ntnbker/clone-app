module Ahoy
  class Message < ActiveRecord::Base

    self.table_name = "ahoy_messages"

    belongs_to :user, AhoyEmail.belongs_to.merge(polymorphic: true)
    

    belongs_to :maintenance_request
    after_update :update_agent_status, if: :clicked_at_changed?
    

  def self.all_maintenance_request_emails(maintenance_request_id)
    self.where(:maintenance_request_id=>maintenance_request_id)
    
  end

  
  def update_agent_status
    
    
    if mailer == "ApplicationMailer#send_agency_admin_maintenance_request_email"
      self.maintenance_request.action_status.update_attribute(:agent_status, "Initiate Maintenance Request")
    elsif mailer == "ApplicationMailer#email_extra_tenant"
      self.maintenance_request.action_status.update_attribute(:agent_status, "Initiate Maintenance Request")
    elsif mailer == "LandlordMailer#send_landlord_maintenance_request"
      self.maintenance_request.action_status.update_attribute(:agent_status, "Initiate Maintenance Request")
    elsif mailer == "AgentMailer#request_quote_email"
      self.maintenance_request.action_status.update_attribute(:agent_status, "Quote Requested")
    elsif mailer == 'TradyMailer#request_quote_email'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Awaiting Quote")
    elsif mailer == 'AgentMailer#send_agent_quote'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Quote Received Awaiting Approval")
    elsif mailer == 'LandlordMailer#send_landlord_quote'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Quote Received Awaiting Approval")
    elsif mailer == 'TradyMailer#approved_quote_email'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Quote Approved Tradie To Organise Appointment")
    elsif mailer == 'TenantMailer#send_tenant_initial_appointment_request'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Tenant To Confirm Appointment")
    elsif mailer == 'TradyMailer#alternative_appointment_picked_email'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Tradie To Confirm Appointment")
    elsif mailer == 'TenantMailer#alternative_appointment_picked_email'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Tenant To Confirm Appointment")
    elsif mailer == 'TradyMailer#appointment_accepted_email'
      self.maintenance_request.action_status.update_attribute(:agent_status, "Maintenance Scheduled - Awaiting Invoice")
      

    end 


    



    
  end


  



  end
end

