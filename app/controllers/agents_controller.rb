class AgentsController < ApplicationController 

  def new
    @agent = Agent.new
    @agency_id = current_user.agency_admin.agency.id
  end

  def create
    
    @agent = Agent.new(agent_params)

    if @agent.valid?
      @agent.save
      @user = User.create(email:params[:agent][:email],password:SecureRandom.hex(5))
      flash[:succes] = "You have added an agent to your team"
      redirect_to new_agent_path
      #email the person with the username and the create new password
    else
      flash[:danger] = "Something went wrong"
      render :new
    end
  end


  def show
    @agent = Agent.find_by(id:current_user.role.roleable_id)
  end

  private

  def agent_params
    params.require(:agent).permit(:agency_id,:email, :name, :mobile_phone, :last_name, :license_number)
  end

end 