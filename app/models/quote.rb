class Quote < ApplicationRecord
  belongs_to :trady
  belongs_to :maintenance_request
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
    return sum
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