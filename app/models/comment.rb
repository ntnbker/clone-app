class Comment <ApplicationRecord
  belongs_to :appointment, inverse_of: :comments
  belongs_to :trady
  belongs_to :tenant

  validates_presence_of :body

  attr_accessor :maintenance_request_id
end 