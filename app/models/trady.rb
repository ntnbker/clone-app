class Trady < ApplicationRecord
  has_many :roles, as: :roleable
  belongs_to :user 
  
  belongs_to :trady_company

  has_many :agency_tradies
  has_many :agencies, through: :agency_tradies
  has_many :maintenance_requests
  has_many :quotes
  has_many :invoices
  has_many :action_statuses
  has_many :appointments
  has_many :comments
  has_many :uploaded_invoices
  has_many :uploaded_quotes
  has_many :quote_requests
  has_many :skills
  validates_presence_of :company_name
  validates_presence_of :name
  validates_presence_of :email
  validates_presence_of :mobile
  validates_uniqueness_of :email


  attr_accessor :maintenance_request_id
  attr_accessor :skill_required
  attr_accessor :trady_request

  def name_and_company
     
    if self.trady_company != nil 
      company_name = self.trady_company.company_name
    end 
    "#{name.capitalize} the #{skill} #{company_name}"
  end

  # def self.skills_needed(trady_id,skill)
  #   skills = Skill.where(trady_id:trady_id).pluck()
    
    
  # end

end 

