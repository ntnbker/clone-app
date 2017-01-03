class Agency < ApplicationRecord
  
  has_many :agency_tradies
  has_many :tradies, through: :agency_tradies
  has_many :agency_admins
  accepts_nested_attributes_for :agency_admins
  validates_associated :agency_admins

  validates :company_name, uniqueness: true
  validates :business_name, uniqueness: true
  validates :abn, uniqueness: true
  validates :mobile_phone, uniqueness: true
  validates :license_number, uniqueness:true 
  validates_presence_of :license_number
  
  validates_presence_of :company_name
  validates_presence_of :business_name
  validates_presence_of :abn
  validates_presence_of :address
  validates_presence_of :mobile_phone
  validates_presence_of :license_type
  
  

  
  
  # validates_presence_of :first_name, if: :perform_presence_validation
  # validates_presence_of :last_name, if: :perform_presence_validation

  

  #here we are saying that an agent_admin can only belong to one user AKA be one user!
  #belongs_to :user, inverse_of: :agency_admin
  
  attr_accessor :perform_presence_validation



end 