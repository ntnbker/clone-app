class AgentsController < ApplicationController 
  def show
    @agent = Agent.find_by(id:current_user.role.roleable_id)
  end

end 