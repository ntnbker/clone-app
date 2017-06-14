class AgencyAdminsController < ApplicationController
  
  
  before_action :require_login, only: [:show,:maintenance_request_index]
  authorize_resource :class => false
  
  def new
    @agency_admin = AgencyAdmin.new
    @agency_id = current_user.agency_admin.agency.id
  end

  def create
    @agency_admin = AgencyAdmin.new(agency_admin_params)

    existing_user = User.find_by(email:params[:agency_admin][:email])
    if existing_user
      existing_role = existing_user.get_role("AgencyAdmin").present?
    end 
    if existing_user && existing_role == false
      role = Role.new(user_id:existing_user.id)
      
      
      @agency_admin = AgencyAdmin.create(agency_admin_params)
      
      
      @agency_admin.roles << role
      role.save
      flash[:success] = "Thank you for adding another Agency Admin."
      new_agency_admin_path
    elsif existing_user && existing_role == true
      @agency_admin = AgencyAdmin.new(agency_admin_params) 
      flash[:danger] = "Sorry this person is already an Agency Administrator"
      render :new
    else 
      if @agency_admin.valid?
      
        @user = User.create(email:params[:agency_admin][:email],password:SecureRandom.hex(5))
        
        @agency_admin.save
        @agency_admin.update_attribute(:user_id, @user.id)
        role = Role.create(user_id:@user.id)
        @agency_admin.roles << role

        flash[:succes] = "You have added a new Agency Administrator to your team"
        UserSetPasswordEmailWorker.perform_async(@user.id)
        redirect_to new_agency_admin_path
      
      
      else
        @agency_admin = AgencyAdmin.new(agency_admin_params)
        flash[:danger] = "Something went wrong"
        render :new
      end 
    end 




  end
  


  def show
    @agency_admin = AgencyAdmin.find_by(id:current_user.id)
  end

  # def maintenance_request_index
  #   @maintenance_requests = current_user.agency_admin.maintenance_requests
  # end

  private

  def agency_admin_params
    params.require(:agency_admin).permit(:email, :first_name, :last_name, :mobile_phone, :license_number, :agency_id)
  end

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
  end


end 