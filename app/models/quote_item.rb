class QuoteItem < ApplicationRecord
  belongs_to :quote, inverse_of: :quote_items
  validates_presence_of :item_description, :amount
end 