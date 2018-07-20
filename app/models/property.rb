class Property < ApplicationRecord
  searchkick word_start: [:property_address]
  # include Elasticsearch::Model
  # include Elasticsearch::Model::Callbacks
  has_many :tenants
  has_many :maintenance_requests
  belongs_to :landlord
  has_many :agency_properties
  has_many :agencies, through: :agency_properties


  after_save :reindex_after_save
  after_update :reindex_after_update

  def reindex_after_save
    self.reindex
  end

  def reindex_after_update
    self.reindex
  end




end 



