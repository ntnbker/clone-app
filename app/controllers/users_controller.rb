class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.valid?
      @user.save
      flash[:success] = "Thank you for signing up."
      redirect_to login_path
      
    else 
      render :new
      flash[:danger] = "Sorry something went wrong"
    end 
  end


  def user_params
    params.require(:user).permit(:receiver_id,:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
  end

end 