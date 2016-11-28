class Agent < ApplicationRecord
  has_many :roles, as: :roleable
end 