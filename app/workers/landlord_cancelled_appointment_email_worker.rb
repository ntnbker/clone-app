
class LandlordCancelledAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id)
    
   
    tenant = Tenant.find_by(id:tenant_id)
    TenantMailer.landlord_cancelled_appointment(tenant).deliver
    

  end

end 
