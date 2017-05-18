class TradyMaintenanceRequest


  def self.find_trady_maintenance_requests(trady_id)
    trady = Trady.find_by(id:trady_id)



    quoting_maintenance_request_ids = Quote.where(trady_id: trady_id, delivery_status: true).pluck(:maintenance_request_id)
    all_maintenance_requests = MaintenanceRequest.where(trady_id: trady_id).or(MaintenanceRequest.where(id: quoting_maintenance_request_ids))
    

   # quote_maintenance_requests =  MaintenanceRequest.joins(:quotes).where(quotes:{trady_id:trady_id}).distinct
   # assigned_maintenance_requests = trady.maintenance_requests


   # all_maintenance_requests = assigned_maintenance_requests.merge(quote_maintenance_requests)

  end


  def self.filtered_trady_maintenance_requests(trady_id, parameter)
    mr = self.find_trady_maintenance_requests(trady_id)
    
    requests = mr.pluck(:id)

    # mr.joins(:trady_action_status).where(trady_action_status:{status:parameter})
  end



end 