class TradieTermAgreementsController < ApplicationController
  def new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_company_id = params[:trady_company_id]
    @trady_id = params[:trady_id]
    redirect_to root_path
    
  end

  def create
    
    if  params[:terms_and_conditions] == "true" 
      
      flash[:success] = "Thank you for accepting the terms and conditions. Please continue the registration below."
      redirect_to new_tradie_registration_path
      
      
    elsif params[:terms_and_conditions] == "false"
      # @maintenance_request_id = params[:maintenance_request_id]
      # @trady_company_id = params[:trady_company_id]
      # @trady_id = params[:trady_id]
       respond_to do |format|
          format.json{render :json=>{errors:"You must agree to the terms and conditions to join the maintenance app network."}}
          format.html{render :new}
      end
    end 
   
  end


  def new_terms_and_conditions_onboarding
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @token = params[:token]
  end

  def create_terms_and_conditions_onboarding

    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @token = params[:token]
    customer_profile = CustomerProfile.find_by(trady_id:@trady_id)
    if  params[:terms_and_conditions] == "true" 
      if customer_profile
        flash[:success] = "Thank you for accepting the terms and conditions. Please setup you password below."
        redirect_to new_onboarding_password_path(maintenance_request_id:@maintenance_request_id, trady_id:@trady_id, token:@token)
      else
        CustomerProfile.create(trady_id:@trady_id, terms_and_conditions: true)
        flash[:success] = "Thank you for accepting the terms and conditions. Please setup you password below."
        redirect_to new_onboarding_password_path(maintenance_request_id:@maintenance_request_id, trady_id:@trady_id, token:@token)
      end 
       
    elsif params[:terms_and_conditions] == "false"
      respond_to do |format|
          format.json{render :json=>{errors:"You must agree to the terms and conditions to join the maintenance app network."}}
          format.html{render :new_terms_and_conditions_onboarding}
      end
    end 

  end



end 