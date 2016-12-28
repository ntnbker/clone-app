class Conversation < ApplicationRecord
  has_many :user_conversations
  has_many :users, :through=> :user_conversations
  has_many :messages
  belongs_to :maintenance_request

  def self.type_of_conversation(type, maintenance_request_id)
  Conversation.where(:conversation_type =>type,:maintenance_request_id=>maintenance_request_id)  
  end


###FIRST CONVERSATION SYSTEM####
  # belongs_to :sender, :class_name => 'User', :foreign_key => 'sender_id'
  # belongs_to :recipient, :class_name => 'User', :foreign_key => 'recipient_id'
  # def self.between(messenger_id,messagee_id)
  #   where(sender_id:messenger_id).where(recipient_id:messagee_id).or(where(sender_id: messagee_id).where(recipient_id: messenger_id))
  # end
end 




