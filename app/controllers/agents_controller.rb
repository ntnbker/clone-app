class AgentsController < ApplicationController 

  def new
    @agent = Agent.new
    @agency_id = current_user.agency_admin.agency.id
  end

  def create
    
    @agent = Agent.new(agent_params)

    if @agent.valid?
      @user = User.create(email:params[:agent][:email],password:SecureRandom.hex(5))
      @agent.save
      @agent.update_attribute(:user_id, @user.id)
      role = Role.create(user_id:@user.id)
      @agent.roles << role

      flash[:succes] = "You have added an agent to your team"
      UserSetPasswordEmailWorker.perform_async(@user.id)
      redirect_to new_agent_path
      
      
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



    