class AccessContact < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :access_contacts

end 