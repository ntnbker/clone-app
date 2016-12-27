class ConversationsController < ApplicationController
  before_action :require_login
  before_action(only: [:show]) { allowed_to_see_conversation(params[:id]) }
  
  def index
    
    conversations = Conversation.where(sender_id:current_user.id).or(Conversation.where(recipient_id:current_user.id))
    
    if conversations.empty?
      @conversations = []
      render :index
    else
      users_conversation = conversations.first
      
      if users_conversation.sender_id == current_user.id || users_conversation.recipient_id == current_user.id
        @conversations = conversations
      else
        flash[:danger] = "Sorry you can see this"
        redirect_to root_path
      end 

    end 
    

  
  end

  def show
    



    @chat = Message.where(conversation_id:params[:id]).order("created_at DESC")
    
    conversation = Conversation.find_by(id:params[:id])
    
    if current_user.id == conversation.recipient_id
      @recipient = conversation.sender_id

    else
      @recipient = conversation.recipient_id
    end 
    @message = Message.new


    
  end

  private

  def allowed_to_see_conversation(params)
    conversation = Conversation.find_by(id:params)


    if conversation.sender_id == current_user.id || conversation.recipient_id == current_user.id
    else
    flash[:danger] = "Sorry you can't see that"
      redirect_to root_path
    end 
  end


  

end 




