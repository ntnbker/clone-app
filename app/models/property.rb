class Property < ApplicationRecord
  # include Elasticsearch::Model
  # include Elasticsearch::Model::Callbacks
  has_many :tenants
  has_many :maintenance_requests
  belongs_to :landlord
  has_one :property 

  # def as_indexed_json(options={})
  #   self.as_json(only: "property_address", 
  #     include: { maintenance_requests: { only: [:name, :service_type, :maintenance_description, :maintenance_heading]},
  #                tenants:    { only: [:name] },
  #                landlord:   { only: [:name] }
  #              })
  # end

  # def self.search(query)
  #   search_definition = {
  #     query:{
  #       multi_match:{
  #         query:query,
  #         fields:["property_address", "name"],
  #         operator: "and"
  #       }
  #     }
  #   }

  #   __elasticsearch__.search(search_definition)
  # end




end 



