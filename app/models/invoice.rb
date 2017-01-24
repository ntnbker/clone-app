class Invoice < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  has_many :invoice_items
end 