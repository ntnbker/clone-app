class MessagesController < ApplicationController 
  
  def new
    @message = Message.new
    respond_to do |format|
      format.html
      format.js
  end
  end


  def create
    binding.pry
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        format.html 
        format.js  
        # format.json { render :show, status: :created, location: @comment }
      else
        format.html { render :new }
        format.json { render json: @message.errors }
        format.js
      end
    end


  end


  private 

  def message_params
    params.require(:message).permit(:id,:message_to,:user_id,:body,:messageable_type, :messageable_id)
    
  end

end 
