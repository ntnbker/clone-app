class MaintenanceRequest < ApplicationRecord
  belongs_to :agency_admin
  has_one :query
  has_many :access_contacts, inverse_of: :maintenance_request
  has_many :availabilities, inverse_of: :maintenance_request

  validates_presence_of :name,:email, :mobile, :maintenance_heading, :maintenance_description, :image 

  accepts_nested_attributes_for :access_contacts, allow_destroy: true
  accepts_nested_attributes_for :availabilities, allow_destroy: true
  
  validates_associated :access_contacts
  validates_associated :availabilities
end 