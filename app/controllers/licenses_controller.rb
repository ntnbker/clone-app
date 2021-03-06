class LicensesController < ApplicationController
  before_action :require_login, only:[:new_license_onboarding, :edit_license_onboarding]
  before_action :require_role
  before_action(only:[:new_license_onboarding]) {allow("Trady")}
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @license = License.new
    @url = root_path(trady_id:@trady_id, role:"Trady", maintenance_request_id:@maintenance_request_id)
  end

  def create
    @trady_id = params[:picture][:trady_id]
    @maintenance_request_id= params[:picture][:maintenance_request_id]
    @role = "Trady"
    @license = License.new(license_params)

    


    if @license.save
      trady = Trady.find_by(id:@trady_id)
      trady.update_attribute(:registration_status,"Pending")
      license_image = @image.as_json(methods: :image_url)
      flash[:success] = "Thank you for joining the maintenance app network. Be ready to receive free job leads."
      redirect_to root_path(trady_id:params[:picture][:trady_id], role:"Trady", maintenance_request_id:params[:picture][:maintenance_request_id])
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@license.errors}}
        format.html {render :new}
      end
    end 
  end


  def new_license_onboarding
     @trady_id = current_user.trady.id
     @license = License.new 
  end

  def create_license_onboarding
    @trady_id = params[:picture][:trady_id]
   
    @license = License.new(license_params)
    #@license.perform_presence_validation = true
    if @license.save
      trady = Trady.find_by(id:@trady_id)
      trady.update_attribute(:registration_status,"Pending")
      license_image = @image.as_json(methods: :image_url)
      flash[:success] = "Thank you for joining the maintenance app network. Be ready to receive free job leads."
      redirect_to trady_maintenance_requests_path
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@license.errors}}
        format.html {render :new}
      end
    end 
  end


  def edit_license_onboarding
    @trady_id = current_user.trady.id 
    @license = License.find_by(id:params[:id])
  end

  def update_license_onboarding
    @trady_id = params[:picture][:trady_id]
   
    @license = License.find_by(id:params[:picture][:id])
    

    if @license.update(license_params) &&  !params[:picture][:image].blank?
      trady = Trady.find_by(id:@trady_id)
      trady.update_attribute(:registration_status,"Pending")
      license_image = @image.as_json(methods: :image_url)
      flash[:success] = "Thank you for updating your license. We will review your application."
      redirect_to trady_maintenance_requests_path
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@license.errors, image_error:"Please pick a file"}}
        format.html {render :edit_license_onboarding}
      end
    end 
  end

  private

  def license_params
     params.require(:picture).permit(:id,:trady_id,:licensed,:license_type ,:license_number,:image, :license_id, :role,:maintenance_request_id)
  end

end 