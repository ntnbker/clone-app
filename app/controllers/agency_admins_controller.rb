class AgencyAdminsController < ApplicationController

  def new
    @customer_input = session[:customer_input]
    @user = User.new
    @user.build_agency_admin
  end

  def create
    #this has to be set up in 4 steps 
    # first we have to create the user
    # then have to create the agency
    # then we have to create the accociation between them
    # then we set the role for the agent
    # @agency = AgencyAdmin.new
    @user = User.new(user_params)
    # @user.agency_admin << @agency


    
    

    if @user.valid?
      @user.save
      ###THIS SETS UP THE ROLE FOR THE USER THAT JUST SIGNED UP
      role = Role.new(user_id:@user.id)
      @agency_admin = AgencyAdmin.find_by(user_id:@user.id)
      @agency_admin.roles << role
      role.save
      #################
      flash[:notice] = "Thank you for signing up."
      login(params[:user][:email], params[:user][:password]) 
      redirect_to agency_admin_path(@agency_admin)
    else 
      render :new
      flash[:notice] = "Sorry something went wrong"
    end 


  end

  

  private

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, agency_admin_attributes: [:user_id, :company_name,:business_name,:abn,:address,:mailing_address, :phone, :mobile_phone,:license_number,:license_type, :corporation_license_number,:bdm_verification_status,:bdm_verification_id, :email, :first_name, :last_name])
  end








end 