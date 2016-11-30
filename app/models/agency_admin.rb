class AgencyAdmin <ApplicationRecord
  has_many :roles, as: :roleable

  #here we are saying that an agent_admin can only belong to one user AKA be one user!
  belongs_to :user
end 