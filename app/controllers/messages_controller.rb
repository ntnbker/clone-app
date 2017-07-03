class MessagesController < ApplicationController 
  before_action :require_login
  def new
    @message = Message.new
  end


  def create
    
    @message = current_user.messages.new(message_params)
    
    respond_to do |format|
      if @message.save
        if Conversation.type_of_conversation(params[:message][:conversation_type],params[:message][:maintenance_request_id]).present?
          @conversation = Conversation.type_of_conversation(params[:message][:conversation_type],params[:message][:maintenance_request_id]).first
          @message.update_attribute(:conversation_id,@conversation.id)
          
          if UserConversation.check_user_conversation(current_user.id, @conversation.id).present?
            #do nothing
          else
            UserConversation.create(user_id:current_user.id,conversation_id:@conversation.id)
          end 
        else 
          @conversation = Conversation.create(conversation_type:params[:message][:conversation_type], maintenance_request_id:params[:message][:maintenance_request_id])
          @message.update_attribute(:conversation_id,@conversation.id)
          UserConversation.create(user_id:current_user.id,conversation_id:@conversation.id)
        end

        format.json{render json:@message}
        
      else
        format.js{render json:@message.errors}
      end
    end

    # if @message.valid?
    #     # if Conversation.type_of_conversation(params[:message][:conversation_type],params[:message][:maintenance_request_id]).present?
    #     #   @conversation = Conversation.type_of_conversation(params[:message][:conversation_type],params[:message][:maintenance_request_id]).first
          
    #     #   @message.update_attribute(:conversation_id,@conversation.id)
    #     #   if UserConversation.check_user_conversation(current_user.id, @conversation.id).present?
    #     #     #do nothing
    #     #   else
    #     #     UserConversation.create(user_id:current_user.id,conversation_id:@conversation.id)
    #     #   end 

    #     # else 
    #     #   @conversation = Conversation.create(conversation_type:params[:message][:conversation_type], maintenance_request_id:params[:message][:maintenance_request_id])
    #     #   @message.update_attribute(:conversation_id,@conversation.id)
    #     #   UserConversation.create(user_id:current_user.id,conversation_id:@conversation.id)
    #     # end





    #     #if the conversation Type is tenant then use this email worker
    # TenantMessageNotificationEmailWorker.perform_async(params[:message][:maintenance_request_id]) 
        
    # end 
    


  end


  def create_quote_messages
    @message = current_user.messages.new(message_params)
    
    respond_to do |format|
      if @message.save
        if Conversation.quote_conversation(params[:message][:conversation_type],params[:message][:quote_id]).present?
          @conversation = Conversation.quote_conversation(params[:message][:conversation_type],params[:message][:quote_id]).first
          @message.update_attribute(:conversation_id,@conversation.id)
          
          if UserConversation.check_user_conversation(current_user.id, @conversation.id).present?
            #do nothing
          else
            UserConversation.create(user_id:current_user.id,conversation_id:@conversation.id)
          end 
        else 
          @conversation = Conversation.create(conversation_type:params[:message][:conversation_type], quote_id:params[:message][:quote_id])
          @message.update_attribute(:conversation_id,@conversation.id)
          UserConversation.create(user_id:current_user.id,conversation_id:@conversation.id)
        end

        format.json{render json:@message}
        
      else
        format.js{render json:@message.errors}
      end
    end
  end


  private 

  def message_params
    params.require(:message).permit(:receiver_id,:id,:role,:user_id,:body,:conversation_id,:maintenance_request_id,:conversation_type, :quote_id)
  end


  def conversation_params
    params.permit(:id, :conversation_type,:maintenance_request_id, :quote_id)
  end


  

end 
