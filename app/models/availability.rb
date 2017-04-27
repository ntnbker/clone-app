class Availability < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :availabilities
  # validates_presence_of :date,:start_time,:finish_time
  
end 