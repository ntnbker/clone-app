class Tenant < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :tenants
  has_many :roles, as: :roleable
  belongs_to :user

  has_many :maintenance_requests

 
end 