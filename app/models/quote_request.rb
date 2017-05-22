class QuoteRequest < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
end 