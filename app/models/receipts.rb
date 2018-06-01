class Receipts < ApplicationRecord
  has_many :invoices
  has_many :uploaded_invoices
  belongs_to :trady

end 