class QuoteRequest < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  has_one :quote
end 