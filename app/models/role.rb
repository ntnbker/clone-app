class Role < ApplicationRecord
  belongs_to :user
  belongs_to :roleable, polymorphic: true


end 