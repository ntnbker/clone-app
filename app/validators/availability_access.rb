class AvailabilityAccess
  include ActiveModel::Validations

  attr_accessor :availability_access
  validates :availability_access, presence: true
  

def initialize(contact={})  
    # Instance variables  
    @update_availability_access = update_availability_access[:update_availability_access]
    
  end



end