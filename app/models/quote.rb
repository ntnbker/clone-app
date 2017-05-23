class Quote < ApplicationRecord
  belongs_to :trady
  belongs_to :maintenance_request
  belongs_to :quote_request
  has_many :quote_items, inverse_of: :quote
  accepts_nested_attributes_for :quote_items, allow_destroy: true



  validates_presence_of :maintenance_request_id
  validates_presence_of :trady_id

   def calculate_quote_items_totals
    items_amount = []
    sum = 0
    self.quote_items.each do |item|
      
      if item.hours == nil 
        items_amount.push(item.amount)
      else
        i = item.amount * item.hours 
        item.update_attribute(:total_per_hour, i)
        items_amount.push(i)
      end 


    end 

    items_amount.each { |a| sum+=a }
    self.update_attribute(:amount, sum)
  end


  def calculate_tax
    invoices_amount = []
    
    if self.tax == nil || self.tax == false
        invoice_total_amount = self.amount
        #tax_amount = invoice_total_amount * 0.10 
        # invoices_amount.push(invoice_total_amount)
        self.update_attribute(:amount, invoice_total_amount)
        self.update_attribute(:gst_amount, 0.00)

      return invoice_total_amount
      else
        invoice_total_amount = self.amount/1.10
        tax_amount = invoice_total_amount * 0.10 
        self.update_attribute(:gst_amount, tax_amount.round(3))
        # total = self.amount
        # invoices_amount.push(total.round(3))
        return invoice_total_amount
    end 

  end




  # def calculate_total(items_hash={})
  #   array = []
   
  #   items_hash.each do |key, value|

  #     if value[:hours] == ""
  #       total = value[:amount].to_f * 1
  #     else
  #       total = value[:amount].to_f * value[:hours].to_f
  #     end


  #     array.push(total)
  #   end

  #   sum = 0
    
  #   array.each { |a| sum+=a }

  #     if tax == false
  #       total = sum
  #     elsif tax == true

  #       total = sum * 1.10  
  #     end 

  #   return total
  # end


end 