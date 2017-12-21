class TenantsController < ApplicationController
  before_action :require_login

   def edit
    @tenant = Tenant.find_by(id:params[:id])
    # @agency_admin.perform_add_agency_admin_validations = true
    # if @agency_admin.agency_admin_profile_image
    #   @profile_image = @agency_admin.agency_admin_profile_image.image_url
    #   @agency_admin_profile_image = @agency_admin.agency_admin_profile_image
    # else
    #   @profile_image = nil
    # end
  end

  def update
    @tenant = Tenant.find_by(id:params[:id])
    #@agency_admin.perform_add_agency_admin_validations = true
    if @tenant.update(tenant_params)
      flash[:success] = "You have successfully updated your profile information"
      redirect_to edit_tenant_path(@tenant)
    else
      flash[:danger] = "Sorry something went wrong. Please fix the fill in the information below."
      respond_to do |format|
        format.json {render :json=>{errors: @tenant.errors.to_hash(true).as_json}}
        format.html {render :edit}
      end 


    end
  end 


  private

  def tenant_params
    params.require(:tenant).permit(:name, :mobile)
    
  end

  
end 