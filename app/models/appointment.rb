class Appointment < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  belongs_to :tenant
  belongs_to :landlord
  has_many :comments, inverse_of: :appointment


  accepts_nested_attributes_for :comments
  validates_associated :comments
  validates_presence_of :date, :time
  #attr_accessor :current_user_role


  validate :future_date, :future_time
    

  def future_date
    if self.date == nil
      
    else
      errors.add(:date, "can't be in the past") if
        self.date <= DateTime.now
    end 
  end

  def future_time
    if self.date == nil 
      
    else
      dt = (self.date.to_s + " " + self.time.to_s).to_datetime
      errors.add(:time, "can't be in the past") if
        dt <= DateTime.now
    end 
  end




  def self.tenant_and_landlord_appointments(maintenance_request_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    appointments = maintenance_request.appointments.where.not(landlord_id:nil, tenant_id:nil)
    return appointments
  end

  def self.tenant_and_trady_appointments(maintenance_request_id)
    maintenance_request = MaintenanceRequest.find_by(id:maintenance_request_id)
    appointments = maintenance_request.appointments.where.not(tenant_id:nil, trady_id:nil)
    return appointments
  end


 

end 

