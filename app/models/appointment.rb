class Appointment < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  belongs_to :tenant
  belongs_to :landlord
  has_many :comments, inverse_of: :appointment


  accepts_nested_attributes_for :comments
  validates_associated :comments

  attr_accessor :current_user_role


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

  # def method_name
    
  # end

  # quote_request_mr_ids = QuoteRequest.where(trady_id:trady_id,quote_id:nil).pluck(:maintenance_request_id)
  # maintenance_requests = MaintenanceRequest.where(id:quote_request_mr_ids)

end 

