class TradyWorkOrderEmailWorker
  include Sidekiq::Worker

  def perform(trady_id,maintenance_request_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    trady = Trady.find_by(id:trady_id)
    TradyMailer.work_order_email(trady,maintenance_request).deliver
   end
end 
