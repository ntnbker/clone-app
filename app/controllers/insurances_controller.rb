class InsurancesController < ApplicationController
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @insurance = Insurance.new
  end

  
  def create
    @insurance = Insurance.new(insurance_params)

    if @insurance.save
      insurance_image = @image.as_json(methods: :image_url)
      respond_to do |format|
        format.json {render :json=>{:insurance_image=>insurance_image}}
      end 
      flash[:success] = "Thank you for adding your insurance to your registration."
      redirect_to new_license_path(trady_id:params[:insurance][:trady_id])
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@insurance.errors}}
      end
    end 
  end

  private

  def insurance_params
    params.require(:insurance).permit(:trady_id, :insurance_company, :policy_number, :policy_expiry_date, :image_data, :insurance_id)
  end

end 