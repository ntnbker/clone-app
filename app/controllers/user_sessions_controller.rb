class UserSessionsController < ApplicationController
  before_action :is_signed_in, only:[:new]

  def new
    
  end

  def create
    
    @user = login(params[:email], params[:password])
    
    if logged_in? && @user.has_role(params[:role_picked])
      @user.current_role.update_attribute(:role, params[:role_picked])
      
      if @user.logged_in_as("God")
        flash[:success] = "You are now signed in"
        redirect_to god_path(@user.role)
        
        elsif @user.logged_in_as("Agent")
          flash[:success] = "You are now signed in"
          
          redirect_to agent_maintenance_requests_path 
        
        elsif @user.logged_in_as("AgencyAdmin")
          flash[:success] = "You are now signed in"
          redirect_to agency_admin_maintenance_requests_path 

        elsif @user.logged_in_as("Tenant")
          flash[:success] = "You are now signed in"
          redirect_to tenant_maintenance_requests_path

        elsif @user.logged_in_as("Landlord")
          flash[:success] = "You are now signed in"
          redirect_to landlord_maintenance_requests_path
        elsif @user.logged_in_as("Trady")
          flash[:success] = "You are now signed in"
          redirect_to trady_maintenance_requests_path
        else
          flash[:danger] = "Something Went Wrong"
          render :menu_bar_login_form_new
          
      end 
    else

      flash[:danger] = "Please use your correct email, password and role you have access to."
      render :menu_bar_login_form_new
      
    end 
  end


  def destroy
    current_user.current_role.update_attribute(:role,nil)
    logout
    redirect_to root_path
    flash[:message] = "You Have Now Logged Out"
  end

  

  private

  def is_signed_in
    
    if current_user
      flash[:notice] = "You are already logged in"
      redirect_to root_path
    elsif current_user != nil 
      redirect_to menu_login_path
    end 
  end

  def user_params
    # params.permit(:email) WE HAVE TO MAKE SURE WE GOT PARAMS INPLACE
  end


end 

# if the user has this type of role and they logged in