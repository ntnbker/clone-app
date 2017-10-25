class Agent < ApplicationRecord
  has_many :roles, as: :roleable
  has_many :maintenance_requests
  has_many :action_statuses
  belongs_to :agency
  belongs_to :user
  has_one :agent_profile_image
  
  validates_presence_of :name,:email, :mobile_phone, :last_name, :license_number
  # validates_uniqueness_of :email


  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates :mobile_phone, :numericality => true, :length => {:minimum=>10, :maximum => 10 }

end 