class Landlord < ApplicationRecord
has_many :roles, as: :roleable
belongs_to :user
attr_accessor :maintenance_request_id

end 