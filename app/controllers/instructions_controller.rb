class InstructionsController < ApplicationController 
  def update
    @current_user = current_user
    @instruction = @current_user.instruction
    @instruction.update_attribute(:read_instruction, true)

    respond_to do |format|
      format.json {render json:@instruction}
    end 
  end
end 