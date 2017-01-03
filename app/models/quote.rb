class Quote < ApplicationRecord
  belongs_to :tradie
  belongs_to :maintenance_request

end 