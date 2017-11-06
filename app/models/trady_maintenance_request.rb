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
      quote_mr_ids = Quote.where(trady_id:trady_id,status:"Active",delivery_status: true).pluck(:maintenance_request_id)
      maintenance_requests = MaintenanceRequest.where(id:quote_mr_ids)
    elsif parameter == "Appointment Required"
      
       maintenance_requests = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Appointment Required"}).distinct
    elsif parameter == "Awaiting Appointment Confirmation"
      maintenance_requests = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Awaiting Appointment Confirmation"}).distinct
    elsif parameter == "Alternate Appointment Requested"
      maintenance_requests = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Alternate Appointment Requested"}).distinct
    elsif parameter == "Job Booked"
      maintenance_requests = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Job Booked"}).distinct
    elsif parameter == "Awaiting Payment"
      maintenance_requests = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Awaiting Payment"}).distinct
    elsif parameter == "Job Complete"
      maintenance_requests = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{maintenance_request_status:"Completed"}).distinct
    elsif parameter == "Declined Quotes"
      quote_mr_ids = Quote.where(trady_id:trady_id,status:"Declined").pluck(:maintenance_request_id)
      maintenance_requests = MaintenanceRequest.where(id:quote_mr_ids)
    end 
    return maintenance_requests  
  end


  def self.filtered_trady_maintenance_requests_count(trady_id, parameter)
    
    if parameter == "Quote Requests"
      quote_request_mr_ids = QuoteRequest.where(trady_id:trady_id,quote_id:nil).pluck(:maintenance_request_id)
      count = MaintenanceRequest.where(id:quote_request_mr_ids).count
    elsif parameter == "Awaiting Quote Approvals"
      quote_mr_ids = Quote.where(trady_id:trady_id,status:"Active", delivery_status: true).pluck(:maintenance_request_id)
      count = MaintenanceRequest.where(id:quote_mr_ids).count
    elsif parameter == "Appointments Required"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Appointment Required"}).distinct.count
    elsif parameter == "Awaiting Appointment Confirmation"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Awaiting Appointment Confirmation"}).distinct.count
    elsif parameter == "Alternate Appointment Requested"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Alternate Appointment Requested"}).distinct.count
    elsif parameter == "Job Booked"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Job Booked"}).distinct.count
    elsif parameter == "Awaiting Payment"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{trady_status:"Awaiting Payment"}).distinct.count
    elsif parameter == "Job Complete"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{maintenance_request_status:"Completed"}).distinct.count
    elsif parameter == "Cancelled Work Order"
      count = MaintenanceRequest.where(trady_id:trady_id).joins(:action_status).where(action_statuses:{maintenance_request_status:"Cancelled Work Order"}).distinct.count
    elsif parameter == "Declined Quotes"
      quote_mr_ids = Quote.where(trady_id:trady_id,status:"Declined").pluck(:maintenance_request_id)
      count = MaintenanceRequest.where(id:quote_mr_ids).count
    end 
    return count 
  end



end 