class QuoteItem < ApplicationRecord
  belongs_to :quote, inverse_of: :quote_items
  validates_presence_of :item_description, :amount
  validates :amount, :numericality => true
  validates :min_price, :numericality => true
  validates :max_price, :numericality => true
end 