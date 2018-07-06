class AccessContact < ApplicationRecord
  belongs_to :maintenance_request, inverse_of: :access_contacts

  validates_presence_of :relation,:name,:email, :mobile, if: :turn_off_validitions
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :mobile,:presence => true, :numericality => true, :length => { :maximum => 10 }

  attr_accessor :turn_off_validitions
end 

