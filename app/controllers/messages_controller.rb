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

    conversation_type = params[:message][:conversation_type]
    role = params[:message][:role]
    maintenance_request = MaintenanceRequest.find_by(id:params[:message][:maintenance_request_id])
    if conversation_type == "Landlord"
      if role == "AgencyAdmin" || role == "Agent"
        LandlordMessageEmailWorker.perform_async(maintenance_request.id)
        #email the landlord they have a new message
      elsif role == "Landlord"
        AgentLandlordMessageEmailWorker.perform_async(maintenance_request.id)
        #email the agent
      end 
    elsif conversation_type == "Tenant"
      if role == "AgencyAdmin" || role == "Agent"
        #email the tenants
        TenantMessageNotificationEmailWorker.perform_async(maintenance_request.id) 
      elsif role == "Tenant"
        AgentTenantMessageEmailWorker.perform_async(maintenance_request.id)
      end 
    elsif conversation_type == "Trady_Agent"
      if role == "AgencyAdmin" || role == "Agent"
        #email the trady 
        TradyAgentMessageEmailWorker.perform_async(maintenance_request.id)
      elsif role == "Trady"
        AgentTradyMessageEmailWorker.perform_async(maintenance_request.id)
        #email the agent  
      end 
    end 
    # if conversation type is landlord
    #   if role is agent or agency admin
    #     email the landlord
    #   elsif role is landlord
    #     email the agent
    # elsif conversation type is tenant
    #   if role is agent or agency admin
    #     email tenants
    #   elsif role is tenant
    #     email the agent
    # elsif conversation type is trady_agent
    #   if role is agent or agency admin
    #     email trady
    #   elsif  role is trady
    #     email the agent

        
          
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

    conversation_type = params[:message][:conversation_type]
    role = params[:message][:role]
    quote = Quote.find_by(id:params[:message][:quote_id])
    maintenance_request = quote.maintenance_request
    if conversation_type == "Quote"
      if role == "AgencyAdmin" || role == "Agent"
        #email the trady 
        TradyAgentQuoteMessageEmailWorker.perform_async(maintenance_request.id,quote.id)
      elsif role == "Trady"
        AgentTradyQuoteMessageEmailWorker.perform_async(maintenance_request.id,quote.id)
        #email the agent  
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
