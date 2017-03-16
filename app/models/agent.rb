class Agent < ApplicationRecord
  has_many :roles, as: :roleable
  has_many :maintenance_requests
  has_many :action_statuses
  belongs_to :agency

  
  validates_presence_of :name,:email, :mobile_phone, :last_name, :license_number
  validates_uniqueness_of :email
end 