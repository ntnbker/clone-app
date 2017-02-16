class UserSessionsController < ApplicationController
  def new
    
  end

  def create
    
    @user = login(params[:email], params[:password])
    if logged_in?
      if @user.god?
        flash[:success] = "You are now signed in"
        redirect_to god_path(@user.role)
        
        elsif @user.agent?
          flash[:success] = "You are now signed in"
          redirect_to agent_path(@user.agent)
        
        elsif @user.agency_admin?
          flash[:success] = "You are now signed in"
          redirect_to agency_admin_path(@user.agency_admin)

        elsif @user.tenant?
          flash[:success] = "You are now signed in"
          redirect_to tenants_path

        else
          render :new
          flash[:danger] = "Something Went Wrong"
      end 
    else
      flash[:danger] = "Something Went Wrong"
      render :new
    end 
  end

  def destroy
    logout
    redirect_to root_path
    flash[:message] = "You Have Now Logged Out"
  end

  def menu_bar_login_form_new
    
  end

  def menu_bar_login_form_create
    @user = login(params[:email], params[:password])
    
    if logged_in?
      if @user.god?
        flash[:success] = "You are now signed in"
        redirect_to god_path(@user.god)
        
        elsif @user.agent?
          flash[:success] = "You are now signed in"
          redirect_to agent_path(@user.agent)
        
        elsif @user.agency_admin?
          
          flash[:success] = "You are now signed in"
          redirect_to root_path

        elsif @user.tenant?
          flash[:success] = "You are now signed in"
          redirect_to tenants_path
          
        else
          flash[:danger] = "Something Went Wrong"
          render :menu_bar_login_form_new
          
      end 
    else

      flash[:danger] = "Please use your correct email and password"
      render :menu_bar_login_form_new
      
    end 
  end


  private

  def user_params
    # params(:)
  end


 


end 