class Tenant < ApplicationRecord
  
  has_many :roles, as: :roleable
  belongs_to :user
  belongs_to :property
  has_many :maintenance_requests

 
end 