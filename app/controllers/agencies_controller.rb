class AgenciesController < ApplicationController
  
  before_action :require_login, only:[:show]
  skip_before_action :require_login,only:[:new, :create]
  authorize_resource :class => false
  



  def new
    @user = User.new
    @user.build_agency_admin.build_agency
    
  end


  def create
    
    @user = User.new(user_params)
    
    
    if @user.valid?
      
      @user.save
      
      flash[:success] = "Thank you for creating an account"
      redirect_to root_path 
      
      
    else  
      flash[:danger] = "Sorry something went wrong"
      render :new

    end 
    
  end


  private
  
  def user_params
    params.require(:user).permit(:id,:email,:password,:password_confirmation, agency_admin_attributes: [:id,:first_name,:last_name,:mobile_phone, agency_attributes:[:id, :company_name,:business_name,:abn,:address,:mailing_same_address ,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id]])
  end

end 


