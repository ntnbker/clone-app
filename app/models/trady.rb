class Trady < ApplicationRecord
  before_save :format_name, :format_company_name, :format_email
  has_many :roles, as: :roleable
  #belongs_to :user 
  belongs_to :user, inverse_of: :trady
  belongs_to :trady_company
  has_one :customer_profile
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
  has_one :trady_profile_image
  validates_presence_of :company_name
  validates_presence_of :name
  validates_presence_of :email
  validates_presence_of :mobile
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :mobile,:numericality => true, :length => {:minimum=>10, :maximum => 10 }
  


  attr_accessor :maintenance_request_id
  attr_accessor :skill_required
  attr_accessor :trady_request

  def capitalize_name
    self.name.split.map(&:capitalize).join(' ')
  end

  def capitalize_company_name
    self.company_name.split.map(&:capitalize).join(' ')
  end

  def name_and_company
     
    if self.trady_company != nil 
      company_name = self.trady_company.company_name
    end 
    "#{name.capitalize} the #{skill} #{company_name}"
  end


  def format_name
    
    self.name = self.name.split.map(&:capitalize).join(' ')

  end

  def format_company_name
    self.company_name = self.company_name.split.map(&:capitalize).join(' ')
  end

  def format_email
    self.email = self.email.gsub(/\s+/, "").downcase
    
  end

  def services_provided
    trady_skills_array = []

      self.skills.each do |skill|
        trady_skills_array.push(skill.skill)
      end 
      return trady_skills_array
  end





  # def self.skills_needed(trady_id,skill)
  #   skills = Skill.where(trady_id:trady_id).pluck()
    
    
  # end

end 

