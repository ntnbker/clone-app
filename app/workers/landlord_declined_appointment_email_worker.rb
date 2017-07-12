class LandlordDeclinedAppointmentEmailWorker
  include Sidekiq::Worker

  def perform(tenant_id)
    
   
    tenant = Tenant.find_by(id:tenant_id)
    TenantMailer.landlord_declined_appointment(tenant).deliver
    

  end

end 
