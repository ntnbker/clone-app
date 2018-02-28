class TradieTermAgreementsController < ApplicationController
  def new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_company_id = params[:trady_company_id]
    @trady_id = params[:trady_id]

    
  end

  def create
    
    if  params[:terms_and_conditions] == "true" 
      trady = Trady.find_by(id:params[:trady_id])
      CustomerProfile.create(trady_id:trady.id, terms_and_conditions: true)

      flash[:success] = "Thank you for joining the maintenance app network. We will email you with free leads as they come in. Thank you for your time."
      redirect_to root_path
    elsif params[:terms_and_conditions] == "false"
      @maintenance_request_id = params[:maintenance_request_id]
      @trady_company_id = params[:trady_company_id]
      @trady_id = params[:trady_id]
       respond_to do |format|
          format.json{render :json=>{errors:"You must agree to the terms and conditions to join the maintenance app network."}}
          format.html{render :new}
      end
    end 
   
  end

end 