class TradyMaintenanceRequest


  def self.find_trady_maintenance_requests(trady_id)
    trady = Trady.find_by(id:trady_id)


   quote_maintenance_requests =  MaintenanceRequest.joins(:quotes).where(quotes:{trady_id:trady_id}).distinct
   assigned_maintenance_requests = trady.maintenance_requests


   all_maintenance_requests = assigned_maintenance_requests.merge(quote_maintenance_requests)
   binding.pry
  end



end 