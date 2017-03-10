class Invoice < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  has_many :invoice_items, inverse_of: :invoice
  accepts_nested_attributes_for :invoice_items, allow_destroy: true

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


end 