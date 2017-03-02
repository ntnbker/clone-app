class Appointment < ApplicationRecord
  belongs_to :maintenance_request
  belongs_to :trady
  belongs_to :tenant
  belongs_to :landlord
  has_many :comments, inverse_of: :appointment


  accepts_nested_attributes_for :comments
  validates_associated :comments

  attr_accessor :current_user_role

end 
