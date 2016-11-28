class GodsController < ApplicationController
  def show
    @god = God.find_by(id:params[:id])

    
    authorize! :show, @god
  end

end 