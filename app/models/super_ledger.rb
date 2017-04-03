# class SuperLedger < ApplicationRecord
#   belongs_to :maintenance_request
#   has_many :ledgers



#   def calculate_total
#     total = []
#     sum = 0
#     self.ledgers.each do |ledger|
#       total.push(ledger.grand_total)
#     end 
#     total.each { |a| sum+=a }

#     self.update_attribute(:grand_total, sum)
#   end



# end 