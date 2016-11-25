class AgencyAdmin <ApplicationRecord
  has_many :roles, as: :roleable
end 