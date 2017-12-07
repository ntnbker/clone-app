class AgentsController < ApplicationController 
  before_action :require_login, only:[:show,:index]
  before_action(only:[:show,:index]) {allow("AgencyAdmin")}
  
  
  caches_action :new, :edit


  def new
    @agent = Agent.new
    @agency_id = current_user.agency_admin.agency.id
  end

  def create
    @agent = Agent.new(agent_params)
    existing_user = User.find_by(email:params[:agent][:email])
    if existing_user
      existing_role = existing_user.get_role("Agent").present?
    end 
    if existing_user && existing_role == false
      role = Role.new(user_id:existing_user.id)
      @agent = Agent.create(agent_params)
      @agent.roles << role
      role.save
      flash[:success] = "Thank you for adding another Agent to your team."
      new_agent_path
    elsif existing_user && existing_role == true
      @agency_admin = Agent.new(agent_params) 
      flash[:danger] = "Sorry this person is already an Agent"
      redirect_to new_agent_path
    else 
      if @agent.valid?
        @user = User.create(email:params[:agent][:email],password:SecureRandom.hex(5))
        @agent.save
        @agent.update_attribute(:user_id, @user.id)
        role = Role.create(user_id:@user.id)
        @agent.roles << role

        flash[:success] = "You have added an agent to your team"
        UserSetPasswordEmailWorker.perform_async(@user.id)
        redirect_to new_agent_path
      else
        
        flash[:danger] = "Something went wrong"
        respond_to do |format|
          format.json {render :json=>{errors: @agent.errors.to_hash(true).as_json}}
          format.html {render :new}
        end
      end 
    end 
  end

  def edit
    @agent = Agent.find_by(id:params[:id])

    if @agent.agent_profile_image
      @profile_image = @agent.agent_profile_image.image_url
      @agent_profile_image = @agent.agent_profile_image
    else
      @profile_image = nil
    end
  end

  def update
    @agent = Agent.find_by(id:params[:id])

    if @agent.update(agent_params)
      flash[:success] = "You have successfully update your profile information."
      redirect_to edit_agent_path(@agent)
    else
      flash[:danger] = "Oops something went wrong. Please add all information below."
      respond_to do |format|
          format.json {render :json=>{errors: @agent.errors.to_hash(true).as_json}}
          format.html {render :edit}
        end
    end   
        
  end


  private

    def agent_params
      params.require(:agent).permit(:agency_id,:email, :name, :mobile_phone, :last_name, :license_number)
    end

end 



    