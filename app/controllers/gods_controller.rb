class GodsController < ApplicationController
  before_action :require_login, only:[:show]
  before_action(only:[:show,:index]) {allow("God")}
  
  def show
    @god = God.find_by(id:params[:id])
    authorize! :show, @god
  end

end 