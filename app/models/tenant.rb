class Tenant < ApplicationRecord
  has_many :roles, as: :roleable

end 