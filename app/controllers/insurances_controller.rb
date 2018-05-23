class InsurancesController < ApplicationController
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @insurance = Insurance.new
  end

  
  def create
    
    @trady_id = params[:picture][:trady_id]
    @maintenance_request_id= params[:picture][:maintenance_request_id]
    @role = "Trady"
    @insurance = Insurance.new(insurance_params)
    
    if params[:picture][:insured] == "true"
      @insurance.perform_presence_validation = true
    else
      @insurance.perform_presence_validation = false
    end 

    

    if @insurance.save
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



  def add_insurance
    @trady_id = params[:trady_id]
  end

  def submit_insurance
    
  end





  private

  def insurance_params
    params.require(:picture).permit(:trady_id,:role,:insured, :insurance_company, :policy_number, :policy_expiry_date, :image, :insurance_id, :maintenance_request_id)
  end

end 