class Landlord < ApplicationRecord
has_many :roles, as: :roleable
belongs_to :user
has_many :properties
has_many :action_statuses
has_many :appointments
attr_accessor :maintenance_request_id

end 