class InsurancesController < ApplicationController
  before_action :require_login, only:[:new_insurance_onboarding, :edit_insurance_onboarding]
  before_action :require_role
  before_action(only:[:new_insurance_onboarding]) {allow("Trady")}
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @insurance = Insurance.new
    @url = new_license_path(trady_id:@trady_id, maintenance_request_id:@maintenance_request_id)
  end

  
  def create
    
    @trady_id = params[:picture][:trady_id]
    @maintenance_request_id= params[:picture][:maintenance_request_id]
    @role = "Trady"
    @insurance = Insurance.new(insurance_params)
    
    
    # @insurance.perform_presence_validation = true
    

    

    if @insurance.save
      trady = Trady.find_by(id:@trady_id)
      trady.update_attribute(:registration_status,"Pending")
      insurance_image = @image.as_json(methods: :image_url)
      #flash[:success] = "Thank you for adding your insurance to your registration."
      redirect_to new_license_path(trady_id:params[:picture][:trady_id], role:"Trady", maintenance_request_id:params[:picture][:maintenance_request_id])
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@insurance.errors}}
        format.html {render :new}
      end
    end 
  end



  def new_insurance_onboarding
    @trady_id = current_user.trady.id 
    @insurance = Insurance.new
  end

  def create_insurance_onboarding
    @trady_id = params[:picture][:trady_id]
    
    @insurance = Insurance.new(insurance_params)
    #@insurance.perform_presence_validation = true
    #add trady registration pending

    

    if @insurance.save
      trady = Trady.find_by(id:@trady_id)
      trady.update_attribute(:registration_status,"Pending")
      insurance_image = @image.as_json(methods: :image_url)
      #flash[:success] = "Thank you for adding your insurance to your registration."
      redirect_to trady_maintenance_requests_path
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@insurance.errors}}
        format.html {render :new}
      end
    end 
  end

  def edit_insurance_onboarding
    @trady_id = current_user.trady.id 
    @insurance = Insurance.find_by(id:params[:id])
  end

  def update_insurance_onboarding
    @trady_id = params[:picture][:trady_id]
    
    @insurance = Insurance.find_by(id:params[:picture][:id])
    

    
    
    if @insurance.update(insurance_params) &&  !params[:picture][:image].blank?
      trady = Trady.find_by(id:@trady_id)

      trady.update_attribute(:registration_status,"Pending")

      insurance_image = @image.as_json(methods: :image_url)
      flash[:success] = "Thank you for updating your insurance. We will review your application."
      redirect_to trady_maintenance_requests_path
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@insurance.errors, image_error:"Please pick a file"}}
        format.html {render :edit_insurance_onboarding}
      end
    end 
  end





  private

  def insurance_params
    params.require(:picture).permit(:id,:trady_id,:role,:insured, :insurance_company, :policy_number, :policy_expiry_date, :image, :insurance_id, :maintenance_request_id)
  end

end 