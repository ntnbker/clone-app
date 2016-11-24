class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.valid?
      @user.save
      flash[:notice] = "Thank you for signing up."
      redirect_to login_path
      
    else 
      render :new
      flash[:notice] = "Sorry something went wrong"
    end 
  end


  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation)
  end

end 