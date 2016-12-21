class Conversation < ApplicationRecord
  belongs_to :sender, :class_name => 'User', :foreign_key => 'sender_id'
  belongs_to :recipient, :class_name => 'User', :foreign_key => 'recipient_id'
  has_many :messages



  def self.between(messenger_id,messagee_id)
    where(sender_id:messenger_id).where(recipient_id:messagee_id).or(where(sender_id: messagee_id).where(recipient_id: messenger_id))
  end
end 




