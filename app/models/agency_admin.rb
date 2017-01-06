class AgencyAdmin <ApplicationRecord
  has_many :roles, as: :roleable
  has_many :maintenance_requests
  belongs_to :user, inverse_of: :agency_admin
  belongs_to :agency, inverse_of: :agency_admins
  
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :mobile_phone  
  
  


  accepts_nested_attributes_for :agency
  validates_associated :user








# #########################
#   accepts_nested_attributes_for :user, :reject_if => lambda { |a| a[:email].blank?||a[:password].blank?||a[:password_confirmation].blank? }
#   #validates_associated :user
#   validates_associated :agency
# ###########################
























  # #############THIS IS FOR THE AGENCY ADMIN####################
  # validates :company_name, uniqueness: true, if: :perform_presence_validation
  
  # validates :business_name, uniqueness: true, if: :perform_presence_validation
  
  # validates :abn, uniqueness: true, if: :perform_presence_validation
 
  # validates :mobile_phone, uniqueness: true, if: :perform_presence_validation
 
  # validates :license_number, uniqueness:true, if: :perform_presence_validation  
  
  
  # validates_presence_of :company_name, if: :perform_presence_validation
  # validates_presence_of :business_name, if: :perform_presence_validation
  # validates_presence_of :abn, if: :perform_presence_validation
  # validates_presence_of :address, if: :perform_presence_validation
  # validates_presence_of :mobile_phone, if: :perform_presence_validation
  # validates_presence_of :license_type, if: :perform_presence_validation
  # validates_presence_of :license_number, if: :perform_presence_validation
  # validates_presence_of :first_name, if: :perform_presence_validation
  # validates_presence_of :last_name, if: :perform_presence_validation

  # has_many :roles, as: :roleable

  # #here we are saying that an agent_admin can only belong to one user AKA be one user!
  # belongs_to :user, inverse_of: :agency_admin
  # has_many :maintenance_requests

  # attr_accessor :perform_presence_validation


  # belongs_to :agency, inverse_of: :agency_admin

end 

