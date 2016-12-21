class MessagesController < ApplicationController 
  
  def new
    @message = Message.new

    @tenant = [1,2,3]
    respond_to do |format|
      format.html
      format.js
  end
  end


  def create
    
    @message = current_user.messages.new(message_params)
    #user_message = UserMessage.create
    

    respond_to do |format|
      if @message.save
        format.html {redirect_to root_path}
        format.js  
        
      else
        format.html { render :new }
        format.js
      end
    end

    if @message.valid?
      
      if Conversation.between(current_user.id,params[:message][:receiver_id]).present?
          @conversation = Conversation.between(current_user.id,params[:message][:receiver_id]).first
          binding.pry
          @message.update_attribute(:conversation_id,@conversation.id)
       else
        @conversation = Conversation.create(sender_id:current_user.id,recipient_id:params[:message][:receiver_id])
        @message.update_attribute(:conversation_id,@conversation.id)
       end
    end 
    


  end


  private 

  def message_params
    params.require(:message).permit(:receiver_id,:id,:user_id,:title,:body,:messageable_type, :messageable_id, :conversation_id)
  end


  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end


  

end 
