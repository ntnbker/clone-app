class AvailabilityAccess
  include ActiveModel::Validations

  attr_accessor :availability_access
  validates :availability_access, presence: true
  

def initialize(availability_access={})  
    # Instance variables  
    @availability_access = availability_access[:availability_access]
    
  end



end