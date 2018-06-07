

class LandlordReminderRepairStatusWorker


  include Sidekiq::Worker

  def perform
         
     maintenance_requests = MaintenanceRequest.all.includes(:tenants,property:[:landlord]).joins(:action_status).where(:action_statuses => { :agent_status =>"Maintenance Scheduled With Landlord" }).distinct


     maintenance_requests.each do |maintenance_request|
      tenant = maintenance_request.tenants.first
      landlord = maintenance_request.property.landlord
      property = maintenance_request.property
      maintenance_request = maintenance_request
      LandlordMailer.reminder_repair_status_email(maintenance_request, landlord, property, tenant).deliver
     end 
    

    

  end


  
end 