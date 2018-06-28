class InvoiceItem < ApplicationRecord
  belongs_to :invoice, inverse_of: :invoice_items
  #validates_presence_of :item_description, :amount

  validates :amount, :presence => true
  validates :item_description, :presence => true
  validates :amount, :numericality => true
  validates :hours, :numericality => true





  validate :positive_number_hours
  validate :positive_number_amount

  def positive_number_hours
    if self.hours == nil || self.hours <= 0
      errors.add(:hours, "Must be a number greater or equal to 1")
    else

    end 
  end


  def positive_number_amount
    if self.amount == nil || self.amount <= 0 
      errors.add(:amount, "Must be a number greater or equal to 1") 
    else
        
    end
     
  end
  

end 







  