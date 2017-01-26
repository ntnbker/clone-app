class Invoice < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  has_many :invoice_items, inverse_of: :invoice
  accepts_nested_attributes_for :invoice_items, allow_destroy: true

  attr_accessor :maintenance_request_id
  attr_accessor :trady_id
  attr_accessor :quote_id 
  
  def calculate_total(items_hash={})
    array = []
    items_hash.each do |key, value|
      
      value.each do |k,v|
        if k == "amount"
          array.push(v.to_i)
        end 
      end
    end

    sum = 0
    array.each { |a| sum+=a }
    return sum
  end


end 