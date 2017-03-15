class AgentsController < ApplicationController 

  def new
    @agent = Agent.new
  end

  def create
    
  end


  def show
    @agent = Agent.find_by(id:current_user.role.roleable_id)
  end

end 