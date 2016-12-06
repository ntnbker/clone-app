class Availability < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :availabilities

end 