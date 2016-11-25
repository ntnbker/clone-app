class Landlord < ActiveRecord::Base
has_many :roles, as: :roleable

end 