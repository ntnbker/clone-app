class AgenciesController < ApplicationController
  # authorize_resource :class => false
   # before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  
  before_action :require_login, only:[:edit,:update]

  before_action(only:[:edit,:update]) {allow("AgencyAdmin")}
  before_action(only:[:show]) {belongs_to_agency_admin}
  
  def new
    @user = User.new
    @user.build_agency_admin.build_agency
  end

  def create
    
    @user = User.new(user_params)

    existing_user = User.find_by(email:params[:user][:email])
    if existing_user
      existing_role = existing_user.get_role("AgencyAdmin").present?
    end
    
    if existing_user && existing_role == false
      role = Role.new(user_id:existing_user.id)
      admin_params = params[:user][:agency_admin_attributes]
      agency_params= params[:user][:agency_admin_attributes][:agency_attributes]
      
      @agency = Agency.create(company_name:agency_params[:company_name],business_name:agency_params[:business_name],abn:agency_params[:abn],address:agency_params[:address],mailing_address:agency_params[:mailing_address],mailing_same_address:agency_params[:mailing_same_address],phone:agency_params[:phone],mobile_phone:agency_params[:mobile_phone],license_type:agency_params[:license_type],license_number:agency_params[:license_number],corporation_license_number:agency_params[:corporation_license_number],bdm_verification_status:agency_params[:bdm_verification_status],bdm_verification_id:agency_params[:bdm_verification_id])
      @agency_admin = AgencyAdmin.create(user_id:existing_user.id,agency_id:@agency.id,first_name:params[:user][:agency_admin_attributes][:first_name],last_name:params[:user][:agency_admin_attributes][:last_name],email:params[:user][:email],mobile_phone:params[:user][:agency_admin_attributes][:mobile_phone])
      
      
      @agency_admin.roles << role
      role.save
      flash[:success] = "Thank you for also signing up as an Agency."
      redirect_to root_path
    elsif existing_user && existing_role == true
      @user = User.new(user_params)  
      flash[:danger] = "Sorry this person is already an Agency Administrator"
      render :new
    else 
      if @user.valid?
        @user.save
        role = Role.new(user_id:@user.id)
        @agency_admin = AgencyAdmin.find_by(user_id:@user.id)
        @agency_admin.update_attribute(:email, params[:user][:email])
        @agency_admin.roles << role
        role.save
        
        flash[:success] = "Thank you for signing up."
        redirect_to root_path
      else
        @user = User.new(user_params)  
        flash[:danger] = "Sorry something went wrong"
        render :new
      end 
    end 


  end

  def edit

    @agency = Agency.find_by(id:params[:id])
    # if @agency.agency_profile_image
    #   @profile_image = @agency_admin.agency_admin_profile_image.image_url
    # else
    #   @profile_image = nil
    # end

  end

  def update
    @agency = Agency.find_by(id:params[:id])
    if @agency.update(agency_params)
      flash[:success] = "Thank you, have updated the agencie's information."
      redirect_to edit_agency_path(@agency)
    else
      flash[:danger] = "Sorry something went wrong. Please fix the errors to succesfully submit"
      render :edit
    end 
  end


  
  private

  def agency_params
    params.require(:agency).permit(:company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number)
  end
  
  def user_params
    params.require(:user).permit(:id,:email,:password,:password_confirmation, agency_admin_attributes: [:id,:first_name,:last_name,:mobile_phone, agency_attributes:[:id, :company_name,:business_name,:abn,:address,:mailing_same_address ,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id]])
  end

  def belongs_to_agency_admin
    
    agency = Agency.find_by(id:params[:id])
    if current_user
      if current_user.agency_admin.agency.id == agency
        #do nothing
      else 
        flash[:notice] = "Sorry you can't see that."
        redirect_to root_path
      end 
    end
  
  end

end 


