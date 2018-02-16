class TradieRegistrationsController < ApplicationController

  def new
    @user = User.new
    @user.build_trady
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_company_id = params[:trady_company_id]
  end

  def create
    @user = User.new(user_params)
    
    maintenance_request_id = params[:user][:trady_attributes][:maintenance_request_id]
    existing_company = TradyCompany.find_by(id:params[:user][:trady_attributes][:trady_company_id])
    
      if @user.save
        flash[:success] = "PLease continue below"
        if existing_company
          redirect_to edit_register_tradie_company_path(id:existing_company.id, maintenance_request_id:maintenance_request_id, trady_id:@user.trady.id)
        else
          redirect_to register_trady_company_path(maintenance_request_id:maintenance_request_id, trady_id:@user.trady.id)
        end 
      else

        respond_to do |format|
          format.json {render :json=>{errors: @user.errors.to_hash(true).as_json}}
          format.html {render :new}
        end
      end   
     
        
  end


  def new_tradie_company
    @trady_company = TradyCompany.new
    @trady_company_id = params[:trady_company_id]
    @trady_id = params[:trady_id]
    @maintenance_request_id =  params[:maintenance_request_id]
  
  end

  def create_tradie_company
    

    @trady_company = TradyCompany.new(trady_company_params)
    @trady_company.perform_bank_validation("Invoice")
    #@existing_company = TradyCompany.find_by(email:params[:trady_company][:email])
    if params[:trady_company][:maintenance_request_id] != ''
      maintenance_request_id = params[:trady_company][:maintenance_request_id]
    end 
    




    if @trady_company.save
      trady = Trady.find_by(id:params[:trady_company][:trady_id])
      trady.update_attribute(:trady_company_id, @trady_company.id)
      flash[:success] = "PLease continue below"
      redirect_to services_path(maintenance_request_id:maintenance_request_id, trady_id:params[:trady_company][:trady_id], trady_company_id:@trady_company.id)
      #redirect_to new_tradie_payment_path(maintenance_request_id:maintenance_request_id, trady_id:params[:trady_company][:trady_id], trady_company_id:@trady_company.id)
    else

      respond_to do |format|
        format.json {render :json=>{errors: @trady_company.errors.to_hash(true).as_json}}
        format.html {render :new_tradie_company}
      end
    end

  end

  def edit_tradie_company
    @trady_company = TradyCompany.find_by(id:params[:id])
    @trady_id = params[:trady_id]
    @maintenance_request_id = params[:maintenance_request_id]
  end

  def update_tradie_company
    @trady_company = TradyCompany.find_by(id:params[:trady_company][:id])
    maintenance_request_id = params[:trady_company][:maintenance_request_id]

    if @trady_company.update(trady_company_params)
      flash[:success] = "You have updated the trady company information"
      redirect_to new_tradie_payment_path(maintenance_request_id:maintenance_request_id, trady_company_id:@trady_company.id)
    else 
      respond_to do |format|
        format.json {render :json=>{errors: @trady_company.errors.to_hash(true).as_json}}
        format.html {render :edit_tradie_company}
      end
    end 
  end

  
  private

  def user_params
    params.require(:user).permit(:email,:password, :password_confirmation, trady_attributes: [:user_id, :company_name,:mobile, :email, :name, :maintenance_request_id, :trady_company_id, :jfmo_participant, :id])
  end

  def trady_company_params
    params.require(:trady_company).permit(:profession_license_number,:landline, :trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email, :account_name, :bsb_number, :bank_account_number, :work_flow, :trady_company_id )
  end

end 