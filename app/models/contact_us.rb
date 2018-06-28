class ContactUs
  include ActiveModel::Validations
  validates :name, presence: true
  validates :email, presence: true
  validates :message, presence: true
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
end