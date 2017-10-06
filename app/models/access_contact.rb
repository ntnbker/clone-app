class AccessContact < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :access_contacts

  validates_presence_of :relation,:name,:email, :mobile
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :phone,:presence => true, :numericality => true, :length => { :maximum => 8 }
end 