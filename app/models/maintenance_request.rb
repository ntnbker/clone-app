# require 'elasticsearch/model'

class MaintenanceRequest < ApplicationRecord
  searchkick

  # include Elasticsearch::Model
  # include Elasticsearch::Model::Callbacks
  # index_name["maintenance_app",Rails.env].join("_")

  belongs_to :agency_admin
  belongs_to :agent
  has_one :query
  has_many :access_contacts, inverse_of: :maintenance_request
  has_many :availabilities, inverse_of: :maintenance_request
  belongs_to :property
  has_many :quotes
  
  has_many :invoices
  has_many :ledgers
  has_one :super_ledger
  has_many :tenant_maintenance_requests
  has_many :tenants, through: :tenant_maintenance_requests
  has_many :conversations
  has_one :action_status
  #has_many :messages, as: :messageable
  has_one :action_status
  has_many :emails, class_name: "Ahoy::Message"
  has_many :appointments
  belongs_to :trady
  has_one :maintenance_request_image, inverse_of: :maintenance_request
  has_many :uploaded_invoices
  has_many :uploaded_quotes
  has_many :trady_statuses
  has_many :quote_requests
  has_many :logs
  has_many :images, inverse_of: :maintenance_request
  validates_presence_of :name,:email, :mobile, :maintenance_heading, :maintenance_description
  validates_presence_of :real_estate_office, :agent_email, :agent_name, :agent_mobile, :person_in_charge, if: :perform_realestate_validations
  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_email

  accepts_nested_attributes_for :maintenance_request_image, allow_destroy: true
  accepts_nested_attributes_for :images, allow_destroy: true
  accepts_nested_attributes_for :access_contacts, allow_destroy: true
  accepts_nested_attributes_for :availabilities, allow_destroy: true
  



  # accepts_nested_attributes_for :invoices



  
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
    
    action_status = ActionStatus.create(maintenance_request_status:"New",agent_status:"Initiate Maintenance Request",action_category:"Action Required" , maintenance_request_id:self.id)
  end



  def self.find_maintenance_requests(current_user, params)
    # current_user_role = current_user.role.roleable_type
    
    if current_user.logged_in_as("AgencyAdmin")
      maintenance_request_array = MaintenanceRequest.where({ agency_admin_id: current_user.get_role("AgencyAdmin").roleable_id}).joins(:action_status).where(:action_statuses => { :agent_status => params}).distinct
    elsif current_user.logged_in_as("Agent")
      maintenance_request_array = MaintenanceRequest.where({ agent_id: current_user.get_role("Agent").roleable_id}).joins(:action_status).where(:action_statuses => { :agent_status => params}).distinct
    # elsif current_user_role == "Trady"
    #   maintenance_request_array = MaintenanceRequest.where({ trady_id: current_user.role.roleable_id})
    end 

    return maintenance_request_array
  end



  def self.find_maintenance_requests_total(current_user, params)
    # current_user_role = current_user.role.roleable_type
    
    if current_user.logged_in_as("AgencyAdmin")
      maintenance_request_array = MaintenanceRequest.where({ agency_admin_id: current_user.get_role("AgencyAdmin").roleable_id}).joins(:action_status).where(:action_statuses => { :agent_status => params}).distinct
      
    elsif current_user.logged_in_as("Agent")
      maintenance_request_array = MaintenanceRequest.where({ agent_id: current_user.get_role("Agent").roleable_id}).joins(:action_status).where(:action_statuses => { :agent_status => params}).distinct
    # elsif current_user == "Trady"
    #   maintenance_request_array =  MaintenanceRequest.where(trady_id: current_user.role.roleable_id)
    end 
    
    if maintenance_request_array #we dont really need another full method for this we can just add a setter and getter and set it in the method above
      return maintenance_request_array.count
    else
      return 0
    end 
  end


  def delivered_invoices
    self.invoices.where(delivery_status: true).order("created_at DESC")
  end

  def delivered_uploaded_invoices
    self.uploaded_invoices.where(delivery_status: true).order("created_at DESC")
  end

  def trady_delivered_uploaded_invoices (maintenance_request_id, trady_id)
    self.uploaded_invoices.where(trady_id:trady_id,:delivery_status=> true, :maintenance_request_id => maintenance_request_id).order("created_at DESC")
  end


  def get_image_urls
    image_array = []
    self.images.each do |image|
      image_array.push(image.image_url)
    end 
    return image_array
  end



  # def self.with_tradies_quote_request(trady_id)
  #   MaintenanceRequest.joins(:quotes).where(quotes:{trady_id:trady_id}).distinct
  # end

  # def find_trady_maintenance_requests(current_user)
  #   maintenance_request_array = MaintenanceRequest.where({ trady_id: current_user.role.roleable_id})
  # end


  # def search_data
  # attributes.merge(
  #   property_address: property(&:property_address),
  #   tenants_name: tenants.map(&:name),
  #   landlord: property.landlord(&:name)
  # )
  # end




  
end 