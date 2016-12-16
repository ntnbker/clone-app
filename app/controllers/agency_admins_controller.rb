class AgencyAdminsController < ApplicationController
  
  #before_action :set_guest_user, only:[:new,:create]
  before_action :require_login, only: [:show]
  load_and_authorize_resource
  
  def new
    
    
    @user = User.new
    @user.build_agency_admin
    
  end

  def create
    
    @user = User.new(user_params)
    
    if @user.valid?
      @user.save
      ###THIS SETS UP THE ROLE FOR THE USER THAT JUST SIGNED UP
      role = Role.new(user_id:@user.id)
      @agency_admin = AgencyAdmin.find_by(user_id:@user.id)
      @agency_admin.update_attribute(:email, params[:user][:email])
      @agency_admin.roles << role
      role.save
      #################
      #logout guest user
      logout
      #login new agency admin user
      auto_login(@user)
      flash[:success] = "Thank you for signing up."
      redirect_to agency_admin_path(@agency_admin)
    else 
      render :new
      flash[:danger] = "Sorry something went wrong"
    end 


  end

  def show
    #@agency_admin = AgencyAdmin.find_by(id:current_user.id)

  end

  

  private

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
  end



  # def set_guest_user
  #  login("martin@maintenanceapp.com.au", 12345)

  # end






end 