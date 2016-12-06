class MaintenanceRequest < ApplicationRecord
  has_many :access_contacts, inverse_of: :maintenance_request
  has_many :availabilities, inverse_of: :maintenance_request

  accepts_nested_attributes_for :access_contacts, allow_destroy: true
  accepts_nested_attributes_for :availabilities, allow_destroy: true
  
  validates_associated :access_contact
  validates_associated :availability
end 