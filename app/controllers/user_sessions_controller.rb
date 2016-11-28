class UserSessionsController < ApplicationController
  def new
    
  end

  def create
    
    @user = login(params[:email], params[:password])
    #binding.pry
    if @user.god?
      flash[:notice] = "You are now signed in"
      
      redirect_to god_path(@user.role)
    elsif @user.agent?
      flash[:notice] = "You are now signed in"
      
      redirect_to agent_path(@user.role)
    else
      render :new
      flash[:notice] = "Something Went Wrong"
    end 
  end


 


end 