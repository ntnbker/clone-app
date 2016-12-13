class AgencyAdmin <ApplicationRecord
  
  validates :company_name, uniqueness: true, if: :perform_presence_validation
  #validates :company_name, presence: true
  validates :business_name, uniqueness: true, if: :perform_presence_validation
  #validates :business_name, presence: true
  validates :abn, uniqueness: true, if: :perform_presence_validation
  #validates :abn, presence: true
  #validates :address, presence: true
  #validates :mobile_phone, presence: true
  validates :mobile_phone, uniqueness: true, if: :perform_presence_validation
  #validates :license_type, presence: true
  #validates :license_number, presence:true
  validates :license_number, uniqueness:true, if: :perform_presence_validation  
  #validates :first_name, presence:true
  #validates :last_name, presence:true
  
  validates_presence_of :company_name, if: :perform_presence_validation
  validates_presence_of :business_name, if: :perform_presence_validation
  validates_presence_of :abn, if: :perform_presence_validation
  validates_presence_of :address, if: :perform_presence_validation
  validates_presence_of :mobile_phone, if: :perform_presence_validation
  validates_presence_of :license_type, if: :perform_presence_validation
  validates_presence_of :license_number, if: :perform_presence_validation
  validates_presence_of :first_name, if: :perform_presence_validation
  validates_presence_of :last_name, if: :perform_presence_validation

  has_many :roles, as: :roleable

  #here we are saying that an agent_admin can only belong to one user AKA be one user!
  belongs_to :user, inverse_of: :agency_admin
  has_many :maintenance_requests

  attr_accessor :perform_presence_validation

end 

