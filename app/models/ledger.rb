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
      if invoice.tax == nil || invoice.tax == false
        invoice_total_amount = invoice.amount/1.10
        #tax_amount = invoice_total_amount * 0.10 
        invoices_amount.push(invoice_total_amount)
        invoice.update_attribute(:amount, invoice_total_amount)
        invoice.update_attribute(:gst_amount, 0.00)


      else
        invoice_total_amount = invoice.amount/1.10
        tax_amount = invoice_total_amount * 0.10 
        invoice.update_attribute(:gst_amount, tax_amount.round(3))
        total = invoice.amount
        invoices_amount.push(total.round(3))

      end 


      
    end 

    invoices_amount.each { |a| sum+=a }
    return sum
  end

  def save_grand_total
    grand_total = self.calculate_grand_total
    self.update_attribute(:grand_total, grand_total)
  end


end