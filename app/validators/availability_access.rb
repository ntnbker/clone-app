class AvailabiltyAccess
  include ActiveModel::Validations

  attr_accessor :availabilty_access
  validates :availabilty_access, presence: true
  

def initialize(contact={})  
    # Instance variables  
    @update_availabilty_access = update_availabilty_access[:update_availabilty_access]
    
  end



end