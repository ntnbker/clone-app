class TradyMaintenanceRequest


  def self.find_trady_maintenance_requests(trady_id)
    trady = Trady.find_by(id:trady_id)


    maintenance_requests_with_quote_requests = QuoteRequest.where(trady_id:trady_id).pluck(:maintenance_request_id)

    quoting_maintenance_request_ids = Quote.where(trady_id: trady_id, delivery_status: true).pluck(:maintenance_request_id)
    
    all_maintenance_requests = MaintenanceRequest.where(trady_id: trady_id).or(MaintenanceRequest.where(id: quoting_maintenance_request_ids)).or(MaintenanceRequest.where(id:maintenance_requests_with_quote_requests))
    

   # quote_maintenance_requests =  MaintenanceRequest.joins(:quotes).where(quotes:{trady_id:trady_id}).distinct
   # assigned_maintenance_requests = trady.maintenance_requests


   # all_maintenance_requests = assigned_maintenance_requests.merge(quote_maintenance_requests)

  end


  def self.filtered_trady_maintenance_requests(trady_id, parameter)
    
    if parameter == "Quote Requests"
      quote_request_mr_ids = QuoteRequest.where(trady_id:trady_id,quote_id:nil).pluck(:maintenance_request_id)
      maintenance_requests = MaintenanceRequest.where(id:quote_request_mr_ids)
    elsif parameter == "Awaiting Quote Approvals"
      quote_mr_ids = Quote.where(trady_id:trady_id,status:"Active").pluck(:maintenance_request_id)
      maintenance_requests = MaintenanceRequest.where(id:quote_mr_ids)
    elsif parameter == "Appointments Required"
    
    elsif parameter == "Awaiting Appointment Confirmation"
    
    elsif parameter == "Alternate Appointment Requested"
    
    elsif parameter == "Job Booked"
    
    elsif parameter == "Awaiting Payment"
    
    elsif parameter == "Job Complete"
    
    elsif parameter == "Declined Quotes"
    
    end 
    return maintenance_requests  
  end



end 