class Service < ApplicationRecord
  belongs_to :god

  validates :service, presence: true
  

end 