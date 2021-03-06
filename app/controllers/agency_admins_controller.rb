class AgencyAdminsController < ApplicationController
  
  
  before_action :require_login
  before_action :require_role
  before_action(only:[:new,:create, :edit, :update]) {allow("AgencyAdmin")}
  
  
  def new
    @agency_admin = AgencyAdmin.new
    @agency_id = current_user.agency_admin.agency.id
  end

  def create
    @agency_admin = AgencyAdmin.new(agency_admin_params)
    @agency_admin.perform_add_agency_admin_validations = true
    
    existing_user = User.find_by(email:params[:agency_admin][:email].gsub(/\s+/, "").downcase)
    if existing_user
      existing_role = existing_user.get_role("AgencyAdmin").present?
    end 
    if existing_user && existing_role == false
      role = Role.new(user_id:existing_user.id)
      @agency_admin = AgencyAdmin.new(agency_admin_params)
      @agency_admin.user_id = existing_user.id
      @agency_admin.save
      @agency_admin.roles << role
      role.save
      flash[:notice] = "Thank you for adding another Agency Admin."
      redirect_to new_agency_admin_path
    elsif existing_user && existing_role == true
      @agency_admin = AgencyAdmin.new(agency_admin_params) 
      flash[:danger] = "Sorry this person is already an Agency Administrator"
      redirect_to new_agency_admin_path
    else 
      if @agency_admin.save
      
        @user = User.create(email:params[:agency_admin][:email],password:SecureRandom.hex(5))
        
        # @agency_admin.save
        @agency_admin.update_attribute(:user_id, @user.id)
        role = Role.create(user_id:@user.id)
        @agency_admin.roles << role

        flash[:succes] = "You have added a new Agency Administrator to your team"
        UserSetPasswordEmailWorker.perform_async(@user.id)
        redirect_to new_agency_admin_path
      
      
      else
        
        
        
        flash[:danger] = "Please fill in the required information."
        respond_to do |format|
          format.json {render :json=>{errors: @agency_admin.errors.to_hash(true).as_json}}
          format.html {render :new}
        end  
        
      end 
    end 
  end

  def edit
    @agency_admin = AgencyAdmin.find_by(id:params[:id])
    @agency_admin.perform_add_agency_admin_validations = true
    if @agency_admin.agency_admin_profile_image
      @profile_image = @agency_admin.agency_admin_profile_image.image_url
      @agency_admin_profile_image = @agency_admin.agency_admin_profile_image
    else
      @profile_image = nil
    end
  end

  def update
    @agency_admin = AgencyAdmin.find_by(id:params[:id])
    @agency_admin.perform_add_agency_admin_validations = true
    if @agency_admin.update(agency_admin_params)
      flash[:success] = "You have successfully updated your profile information"
      redirect_to edit_agency_admin_path(@agency_admin)
    else
      flash[:danger] = "Sorry something went wrong. Please fix the errors"
      respond_to do |format|
        format.json {render :json=>{errors: @agency_admin.errors.to_hash(true).as_json}}
        format.html {render :edit}
      end 


    end

  end
  


  

  private

  def agency_admin_params
    params.require(:agency_admin).permit(:email, :first_name, :last_name, :mobile_phone, :license_number, :agency_id)
  end

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
  end


end 