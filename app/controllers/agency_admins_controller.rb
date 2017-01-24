class AgencyAdminsController < ApplicationController
  
  
  before_action :require_login, only: [:show,:maintenance_request_index]
  authorize_resource :class => false
  
  def show
    @agency_admin = AgencyAdmin.find_by(id:current_user.id)
  end

  def maintenance_request_index
    @maintenance_requests = current_user.agency_admin.maintenance_requests
  end

  private

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
  end


end 