class Quote < ApplicationRecord
  belongs_to :trady
  belongs_to :maintenance_request
  has_many :quote_items, inverse_of: :quote
  accepts_nested_attributes_for :quote_items, allow_destroy: true

end 