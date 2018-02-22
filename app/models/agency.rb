class Agency < ApplicationRecord
  before_save :format_company_name, :format_business_name, :format_address, :format_mailing_address

  has_many :agency_admins
  has_many :agents
  has_many :agency_tradies
  has_many :tradies, through: :agency_tradies
  has_many :properties
  has_one :agency_profile_image
  has_one :customer_profile
  validates :company_name, uniqueness: true
  validates :business_name, uniqueness: true
  validates :abn, uniqueness: true
  
  validates :license_number, uniqueness:true 
  
  
  validates_presence_of :company_name
  validates_presence_of :business_name
  validates_presence_of :abn
  validates_presence_of :address
  validates_presence_of :mobile_phone
  validates_presence_of :phone
  validates_presence_of :license_type
  validates_presence_of :license_number
  
  #validates_associated :agency_admins




  
  validates :mobile_phone, :numericality => true, :length => {:minimum=>10, :maximum => 10 }
  validates :phone, :numericality => true, :length => {:minimum=>10, :maximum => 10 }
  validates :abn, :numericality => true, :length => {:minimum=>11, :maximum => 11 }
  

  
  def skilled_tradies_required(skill_params)
    trady_ids = self.tradies.pluck(:id)
    tradies_with_desired_skill = Skill.where(trady_id:trady_ids, skill:skill_params).pluck(:trady_id)
    the_tradies = Trady.where(id:tradies_with_desired_skill)
  end

  def capitalize_company_name
    self.business_name = self.business_name.split.map(&:capitalize).join(' ')
  end

  def format_company_name
    self.company_name = self.company_name.split.map(&:capitalize).join(' ')
  end

  def format_business_name
    self.business_name = self.business_name.split.map(&:capitalize).join(' ')
  end

  def format_address
   self.address = self.address.split.map(&:capitalize).join(' ')
  end

  def format_mailing_address
    self.mailing_address = self.mailing_address.split.map(&:capitalize).join(' ')
  end





end 