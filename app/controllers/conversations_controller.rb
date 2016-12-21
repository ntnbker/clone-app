class ConversationsController < ApplicationController
  before_action :require_login
  
  def index
    @conversations = Conversation.where(sender_id:current_user.id).or(Conversation.where(recipient_id:current_user.id))
  end

  def show
    @conversation = Message.where(conversation_id:params[:id]).order("created_at DESC")
    @recipient = Conversation.find_by(id:params[:id]).recipient_id
    
    @message = Message.new
  end

  private

  def allowed_to_see_conversation
    
  end




end 



# first_name_relation = User.where(:first_name => 'Tobias') # ActiveRecord::Relation
# last_name_relation  = User.where(:last_name  => 'Fünke') # ActiveRecord::Relation



