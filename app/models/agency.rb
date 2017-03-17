class Agency < ApplicationRecord
  
  has_many :agency_admins
  has_many :agents
  has_many :agency_tradies
  has_many :tradies, through: :agency_tradies

  
  
  validates :company_name, uniqueness: true
  validates :business_name, uniqueness: true
  validates :abn, uniqueness: true
  validates :mobile_phone, uniqueness: true
  validates :license_number, uniqueness:true 
  
  
  validates_presence_of :company_name
  validates_presence_of :business_name
  validates_presence_of :abn
  validates_presence_of :address
  validates_presence_of :mobile_phone
  validates_presence_of :license_type
  validates_presence_of :license_number
  
  validates_associated :agency_admins
  

























  attr_accessor :perform_presence_validation



end 