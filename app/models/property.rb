class Property < ApplicationRecord
  has_many :tenants
  has_many :maintenance_requests
  belongs_to :landlord
end 