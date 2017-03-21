class Ledger < ApplicationRecord
  belongs_to :maintenance_request
  has_many :invoices
  accepts_nested_attributes_for :invoices, allow_destroy: true
end