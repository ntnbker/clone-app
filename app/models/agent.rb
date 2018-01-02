class Agent < ApplicationRecord
  before_save :format_name, :format_last_name
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



  def format_name
    self.name = self.name.split.map(&:capitalize).join(' ')
  end

  def format_last_name
    self.last_name = self.last_name.split.map(&:capitalize).join(' ')
  end

end 