class LicensesController < ApplicationController
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @license = License.new
    
  end

  def create
    @trady_id = params[:picture][:trady_id]
    @maintenance_request_id= params[:picture][:maintenance_request_id]
    @role = "Trady"
    @license = License.new(license_params)

    if @license.save
      license_image = @image.as_json(methods: :image_url)
      flash[:success] = "Thank you for adding your license to your registration."
      redirect_to root_path(trady_id:params[:picture][:trady_id], role:"Trady", maintenance_request_id:params[:picture][:maintenance_request_id])
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@license.errors}}
        format.html {render :new}
      end
    end 
  end

  private

  def license_params
     params.require(:picture).permit(:trady_id,:licensed ,:image, :license_id, :role,:maintenance_request_id)
  end

end 