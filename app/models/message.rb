class Message < ApplicationRecord
  
  belongs_to :messageable, polymorphic: true
  belongs_to :conversation
  belongs_to :user
  attr_accessor :receiver_id
  attr_accessor :maintenance_request_id
  attr_accessor :conversation_type

  
  
end 