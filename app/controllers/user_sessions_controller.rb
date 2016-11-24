class UserSessionsController < ApplicationController
  def new
    
  end

  def create
    
    @user = login(params[:email], params[:password])
    if @user
      flash[:notice] = "You are now signed in"
      redirect_to root_path
    else 

    end 
  end


 


end 