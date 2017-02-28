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

  validates_presence_of :name,:email, :mobile, :maintenance_heading, :maintenance_description
  validates_presence_of :real_estate_office, :agent_email, :agent_name, :agent_mobile, :person_in_charge, if: :perform_realestate_validations
  validates_uniqueness_of :email, if: :perform_uniqueness_validation_of_email

  accepts_nested_attributes_for :maintenance_request_image, allow_destroy: true
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
    
    action_status = ActionStatus.create(maintenance_request_status:"New",agent_status:"Initiate Maintenance Request",action_category:"Action Required" , maintenance_request_id:self.id)
  end

  # def as_indexed_json(options={})
  #   self.as_json(only: [:name, :service_type, :maintenance_description, :maintenance_heading], 
  #     include: { property: { only:[:property_address, :name] },
  #                tenants:    { only: [:name] }
                 
  #              })
  # end

  # def self.search(query)
  #   search_definition = {
  #     query:{
  #       multi_match:{
  #         query:query,
  #         fields:["property_address", "name", "maintenance_description"],
          
  #       }
  #     }
  #   }

  #   __elasticsearch__.search(search_definition)
  # end


  def search_data
  attributes.merge(
    property_address: property(&:property_address),
    tenants_name: tenants.map(&:name),
    landlord: property.landlord(&:name)
  )
end




  
end 