class Quote < ApplicationRecord
  belongs_to :trady
  belongs_to :maintenance_request
  has_many :quote_items, inverse_of: :quote
  accepts_nested_attributes_for :quote_items, allow_destroy: true



  validates_presence_of :maintenance_request_id
  validates_presence_of :trady_id

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