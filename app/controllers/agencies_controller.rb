class AgenciesController < ApplicationController

  def new
    @agency = Agency.new
    @agency_admin = @agency.agency_admins.build
    @agency_admin.build_user

    
  end


  def create
    @agency = Agency.new
    @agency_admin = @agency.agency_admins.build
    @agency_admin.build_user

    if @agency.valid?

      redirect_to root_path
    else  
      render :new

    end 
    
  end


  private
  
  def agency_params
    #params.require(:agency).permit(:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
    params.require(:agency).permit(:company_name,:business_name,:abn,:address,:mailing_same_address ,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, agency_admin_attributes: [:user_id,:id,:agency_id,:first_name,:last_name,:mobile_phone,:user_attributes[:id,:email,:password,:password_confirmation]])
  end
# :email,:password, :password_confirmation,
end 


