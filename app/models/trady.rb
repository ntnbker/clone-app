class Trady < ApplicationRecord
  has_many :roles, as: :roleable
  belongs_to :user 
  
  belongs_to :trady_company

  has_many :agency_tradies
  has_many :agencies, through: :agency_tradies
  
  has_many :quotes
  
  validates_presence_of :name
  validates_presence_of :email
  validates_presence_of :mobile

  attr_accessor :maintenance_request_id
  attr_accessor :skill_required

  def name_and_company
    "#{name.capitalize} the #{skill}, #{self.trady_company.company_name}"
  end

end 