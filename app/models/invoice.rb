class Invoice < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :invoices
  
  belongs_to :trady
  belongs_to :ledger, inverse_of: :invoices
  has_many :invoice_items, inverse_of: :invoice
  accepts_nested_attributes_for :invoice_items, allow_destroy: true
  




  has_many :invoice_payments
  # attr_accessor :maintenance_request_id
  # attr_accessor :trady_id
  attr_accessor :quote_id 
  
  def calculate_total(items_hash={})
    array = []
   
    items_hash.each do |key, value|

      if value[:hours] == ""
        total = value[:amount].to_f * 1
      else
        total = value[:amount].to_f * value[:hours].to_f
      end


      array.push(total)
    end

    sum = 0
    binding.pry
    array.each { |a| sum+=a }

      if tax == false
        total = sum
      elsif tax == true

        total = sum * 1.10  
      end 

    return total
  end


  def check_payment(money_paid)
    if money_paid.to_f < amount 
      self.update_attribute(:payment_status, "Partial Payment Completed")
    elsif money_paid == amount
      self.update_attribute(:payment_status, "Full Payment Complete")
    end 
  end


end 