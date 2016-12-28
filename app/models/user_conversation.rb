class UserConversation < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  def self.check_user_conversation(user_id, conversation_id)
    UserConversation.where(:user_id =>user_id,:conversation_id=>conversation_id)  
  end



end 