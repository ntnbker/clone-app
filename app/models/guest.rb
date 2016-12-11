class Guest < ApplicationRecord
  belongs_to :user
  has_many :roles, as: :roleable

end 