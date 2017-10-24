class AgencyAdmin <ApplicationRecord
  has_many :roles, as: :roleable
  has_many :maintenance_requests
  belongs_to :user, inverse_of: :agency_admin
  belongs_to :agency, inverse_of: :agency_admins
  has_many :action_statuses
  has_one :agency_admin_profile_image
  
  
  validates_presence_of :email, :license_number,:first_name, :mobile_phone, :last_name, if: :perform_add_agency_admin_validations
  
  

  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/, if: :perform_add_agency_admin_validations
  validates :mobile_phone, :numericality => true, :length => {:minimum=>10, :maximum => 10 }, if: :perform_add_agency_admin_validations


  accepts_nested_attributes_for :agency
  #validates_associated :user





attr_accessor :perform_add_agency_admin_validations


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

