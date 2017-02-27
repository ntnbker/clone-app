class Property < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  has_many :tenants
  has_many :maintenance_requests
  belongs_to :landlord


  def as_indexed_json(options={})
    self.as_json(only: "property_address", 
      include: { maintenance_requests: { only: [:name, :service_type, :maintenance_description, :maintenance_heading]},
                 tenants:    { only: [:name] },
                 landlord:   { only: [:name] }
               })
  end





end 



