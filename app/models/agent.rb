class Agent < ApplicationRecord
  has_many :roles, as: :roleable
  has_many :maintenance_requests
  has_many :action_statuses
  belongs_to :agency
end 