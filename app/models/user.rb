class User < ApplicationRecord
  authenticates_with_sorcery!
  
  validates :email, uniqueness: true
  validates :email, presence: true
  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, presence: true
  validates_confirmation_of :password, if: -> { new_record? || changes[:crypted_password] }

end
