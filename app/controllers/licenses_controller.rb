class LicensesController < ApplicationController
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @license = License.new
  end

  def create
    @license = License.new(license_params)

    if @license.save
      license_image = @image.as_json(methods: :image_url)
      respond_to do |format|
        format.json {render :json=>{:license_image=>license_image}}
      end 
      flash[:success] = "Thank you for adding your license to your registration."
      redirect_to new_license_path(trady_id:params[:license][:trady_id], role:"Trady", maintenance_request_id:params[:license][:maintenance_request_id])
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@license.errors}}
      end
    end 
  end

  private

  def license_params
     params.require(:license).permit(:trady_id,  :image_data, :license_id)
  end

end 