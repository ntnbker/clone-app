class Ledger < ApplicationRecord
  belongs_to :maintenance_request
  has_many :invoices
  accepts_nested_attributes_for :invoices, allow_destroy: true



  attr_accessor :trady_id
  attr_accessor :quote_id 

  def calculate_grand_total
    invoices_amount = []
    sum = 0
    self.invoices.each do |invoice|
      invoice_total_amount = invoice.amount
      invoices_amount.push(invoice_total_amount)
    end 

    invoices_amount.each { |a| sum+=a }
    return sum
  end

  def save_grand_total
    grand_total = self.calculate_grand_total
    self.update_attribute(:grand_total, grand_total)
  end


end