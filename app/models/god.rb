class God <ApplicationRecord
  has_many :roles, as: :roleable
  has_many :services
  has_many :main_users
  belongs_to :user
end 