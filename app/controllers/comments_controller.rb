class CommentsController < ApplicationController
  
  def create
    
    @comment = Comment.new(comments_params)

    @appointment = Appointment.find_by(id: params[:comment][:appointment_id])
    @maintenance_request_id = params[:comment][:maintenance_request_id]
    @tenant_id  = params[:comment][:tenant_id]
    @trady_id = params[:comment][:trady_id]




    if @comment.valid?
      @comment.save
    else 
      
      render "appointments/edit"
    end 
        
    
  end

  private

  def comments_params
    params.require(:comment).permit(:body,:appointment_id,:maintenance_request_id, :trady_id,:tenant_id)
  end

end 