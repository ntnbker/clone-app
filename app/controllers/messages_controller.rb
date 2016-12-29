class MessagesController < ApplicationController 
  before_action :require_login
  def new
    @message = Message.new
  end


  def create
    
    @message = current_user.messages.new(message_params)
    #user_message = UserMessage.create
    

    respond_to do |format|
      if @message.save
        format.html {render "agent_maintenance_requests/show.html.haml", :success =>"Your message was sent FUCK THIS SHIT"}  
        format.js{render layout: false, content_type: 'text/javascript'}
        
      else
        format.html { render :show }
        format.js{}
        
      end
    end

    if @message.valid?
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
        TenantMessageNotificationEmailWorker.perform_async(params[:message][:maintenance_request_id]) 
        #EmailWorker.perform_async(params[:message][:maintenance_request_id])
        #HERE WE CAN EMAIL ALL TENANTS THAT THEY HAVE A NEW MESSAGE USERS 
      

      ##OLD MESSAGING SYSTEM##
      # if Conversation.between(current_user.id,params[:message][:receiver_id]).present?
      #     @conversation = Conversation.between(current_user.id,params[:message][:receiver_id]).first
      #     binding.pry
      #     @message.update_attribute(:conversation_id,@conversation.id)
      #  else
      #   @conversation = Conversation.create(sender_id:current_user.id,recipient_id:params[:message][:receiver_id])
      #   @message.update_attribute(:conversation_id,@conversation.id)
      #  end
    end 
    


  end


  private 

  def message_params
    params.require(:message).permit(:receiver_id,:id,:user_id,:body,:conversation_id,:maintenance_request_id,:conversation_type)
  end


  def conversation_params
    params.permit(:id, :conversation_type,:maintenance_request_id)
  end


  

end 
