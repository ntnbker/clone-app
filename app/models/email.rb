class Email < Ahoy::Message
  belongs_to :maintenance_request


  def self.all_maintenance_request_emails(maintenance_request_id)
    self.where(:maintenance_request_id=>maintenance_request_id)
    
  end

  def update_the_agents_status_to_initiated
      #have to change the the name of this method
  end

end 