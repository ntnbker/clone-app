class TenantAvailabilitiesController < ApplicationController
  before_action :require_login
  before_action :require_role

  def update
    availability_access = AvailabiltyAccess.new(availability_access_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:availability_access][:maintenance_request_id])
    if availability_access.valid?
      maintenance_request.update_attribute(:availability_and_access, params[:availability_access][:availability_access])
      respond_to do |format|
        format.json {render :json=>{availability_and_access:maintenance_request.availability_and_access}}
      end
    else
      respond_to do |format|
        format.json {render :json=>{errors:availability_access.errors.to_hash(true).as_json}}
      end
    end 
  end

  private

  def availability_access_params
    params.fetch(:availability_access, {}).permit(:availability_access)
  end

end