class InvoiceItem < ApplicationRecord
  belongs_to :invoice, inverse_of: :invoice_items
  validates_presence_of :item_description, :amount

  
  validates :amount, :numericality => true


  

end 