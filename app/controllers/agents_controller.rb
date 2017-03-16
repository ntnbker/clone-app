class AgentsController < ApplicationController 

  def new
    @agent = Agent.new
    @agency_id = current_user.agency_admin.agency.id
  end

  def create
    
  end


  def show
    @agent = Agent.find_by(id:current_user.role.roleable_id)
  end

  private

  def agent_params
    
  end

end 