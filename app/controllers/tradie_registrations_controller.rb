class TradieRegistrationsController < ApplicationController

  def new
    @user = User.new
    @user.build_trady
  end

  def create
    
  end

  private

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, trady_attributes: [:user_id, :company_name,:mobile, :email, :name])
  end

end 