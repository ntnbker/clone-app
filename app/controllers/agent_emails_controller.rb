class AgentEmailsController < ApplicationController
  def index
    #grabs all the emails in our system
    @emails = AgencyEmail.find_all
    respond_to do |format|
      format.json {render json:@emails}
    end 
  end

end 