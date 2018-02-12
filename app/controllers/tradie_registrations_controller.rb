class TradieRegistrationsController < ApplicationController

  def new
    @user = User.new
    @user.build_trady
    @maintenance_request_reference_id = params[:maintenance_request_id]
  end

  def create
    @user = User.new(user_params)
    
    maintenance_request_id = params[:user][:trady_attributes][:maintenance_request_id]

    if @user.save
      flash[:success] = "PLease continue below"
      redirect_to register_trady_company_path(maintenance_request_id:maintenance_request_id, trady_id:@user.trady.id)
    else

      respond_to do |format|
        format.json {render :json=>{errors: @user.errors.to_hash(true).as_json}}
        format.html {render :new}
      end
    end   
        
  end


  def new_tradie_company
    @trady_company = TradyCompany.new
    @trady_id = params[:trady_id]
    @maintenance_request_id =  params[:maintenance_request_id]
  
  end

  def create_tradie_company
    if @trady_company.save
      flash[:success] = "PLease continue below"
      redirect_to register_trady_payment_path(maintenance_request_id:maintenance_request_id, trady_id:@user.trady.id)
    else

      respond_to do |format|
        format.json {render :json=>{errors: @user.errors.to_hash(true).as_json}}
        format.html {render :new}
      end
    end 
  end

  def edit_tradie_company
    
  end

  def update_tradie_company
    
  end

  
  private

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, trady_attributes: [:user_id, :company_name,:mobile, :email, :name])
  end

end 