class Agent < ApplicationRecord
  has_many :roles, as: :roleable
  has_many :maintenance_requests
end 