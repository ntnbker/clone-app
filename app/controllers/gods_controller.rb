class GodsController < ApplicationController
  before_action :require_login
  
  def show
    @god = God.find_by(id:params[:id])
    authorize! :show, @god
    
  end

end 