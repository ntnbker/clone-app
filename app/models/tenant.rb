class Tenant < ApplicationRecord
  
  has_many :roles, as: :roleable
  belongs_to :user
  belongs_to :property
  has_many :tenant_maintenance_requests
  has_many :maintenance_requests, through: :tenant_maintenance_requests
 
end 