class Address
  include ActiveModel::Validations

  attr_accessor :address
  validates :address, presence: true
  

def initialize(address={})  
    # Instance variables  
    @address = address[:address]
    
  end



end