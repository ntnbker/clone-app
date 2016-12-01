class AgencyAdmin <ApplicationRecord
  
  validates :company_name, uniqueness: true
  #validates :company_name, presence: true
  validates :business_name, uniqueness: true
  #validates :business_name, presence: true
  validates :abn, uniqueness: true
  #validates :abn, presence: true
  #validates :address, presence: true
  #validates :mobile_phone, presence: true
  validates :mobile_phone, uniqueness: true
  #validates :license_type, presence: true
  #validates :license_number, presence:true
  validates :license_number, uniqueness:true  
  #validates :first_name, presence:true
  #validates :last_name, presence:true
  
  validates_presence_of :company_name, :business_name, :abn, :address, :mobile_phone, :license_type, :license_number, :first_name,:last_name
  has_many :roles, as: :roleable

  #here we are saying that an agent_admin can only belong to one user AKA be one user!
  belongs_to :user, inverse_of: :agency_admin
end 

