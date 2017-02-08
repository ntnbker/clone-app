class MaintenanceRequest < ApplicationRecord
  belongs_to :agency_admin
  belongs_to :agent
  has_one :query
  has_many :access_contacts, inverse_of: :maintenance_request
  has_many :availabilities, inverse_of: :maintenance_request
  belongs_to :property
  has_many :quotes
  has_many :invoices
  has_many :tenant_maintenance_requests
  has_many :tenants, through: :tenant_maintenance_requests
  has_many :conversations
  has_one :action_status
  #has_many :messages, as: :messageable
  
  validates_presence_of :name,:email, :mobile, :maintenance_heading, :maintenance_description, :image
  validates_presence_of :real_estate_office, :agent_email, :agent_name, :agent_mobile, :person_in_charge, if: :perform_realestate_validations
  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_email


  accepts_nested_attributes_for :access_contacts, allow_destroy: true
  accepts_nested_attributes_for :availabilities, allow_destroy: true
  
  
  validates_associated :access_contacts
  validates_associated :availabilities
  
  attr_accessor :perform_uniqueness_validation_of_email
  attr_accessor :perform_realestate_validations


  after_create :create_action_status


  def mr_tenants_array

    array = self.tenants.map{|j|["Tenant", j.user_id]}
    return array
  end


  def create_action_status
    
    action_status = ActionStatus.create(maintenance_request_status:"New",agent_status:"Action Required", maintenance_request_id:self.id)
  end




  
end 