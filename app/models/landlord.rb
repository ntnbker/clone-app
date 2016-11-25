class Landlord < ApplicationRecord
has_many :roles, as: :roleable

end 