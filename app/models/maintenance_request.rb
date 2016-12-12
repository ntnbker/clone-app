class MaintenanceRequest < ApplicationRecord
  belongs_to :agency_admin
  has_one :query
  has_many :access_contacts, inverse_of: :maintenance_request
  has_many :availabilities, inverse_of: :maintenance_request
  belongs_to :property
  belongs_to :tenant
  
  validates_presence_of :name,:email, :mobile, :maintenance_heading, :maintenance_description, :image, :real_estate_office, :agent_email, :agent_name, :agent_mobile, :person_in_charge

  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_email


  accepts_nested_attributes_for :access_contacts, allow_destroy: true
  accepts_nested_attributes_for :availabilities, allow_destroy: true
  
  
  validates_associated :access_contacts
  validates_associated :availabilities
  



  attr_accessor :perform_uniqueness_validation_of_email





  
end 