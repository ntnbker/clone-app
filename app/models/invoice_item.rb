class InvoiceItem < ApplicationRecord
  belongs_to :invoice, inverse_of: :invoice_items
  validates_presence_of :item_description, :amount

  
  validates :amount, :numericality => true
  validates :hours, :numericality => true





  validate :positive_number
    

  def positive_number
    if self.hours >= 1
      
    else
      errors.add(:hours, "Must be a number greater or equal to 1") if
        self.hours <= 0 
    end 
  end
  

end 