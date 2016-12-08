class AccessContact < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :access_contacts
  validates_presence_of :relation,:name,:email, :mobile

end 