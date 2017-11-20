class Message < ApplicationRecord
  
  belongs_to :messageable, polymorphic: true
  belongs_to :conversation
  belongs_to :user
  attr_accessor :receiver_id
  attr_accessor :maintenance_request_id
  attr_accessor :conversation_type
  attr_accessor :quote_id
  attr_accessor :quote_request_id
  validates_presence_of :body

  
  
end 