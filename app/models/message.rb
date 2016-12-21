class Message < ApplicationRecord
  attr_accessor :receiver_id
  belongs_to :messageable, polymorphic: true
  belongs_to :conversation
  belongs_to :user
end 