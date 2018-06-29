class AddressesController < ApplicationController
  before_action :require_login
  before_action :require_role
  
  def update
    address = Address.new(address_params)
    maintenance_request = MaintenanceRequest.find_by(id:params[:address][:maintenance_request_id])

    if address.valid?
      if maintenance_request.agency_admin
        agency = maintenance_request.agency_admin.agency
      elsif maintenance_request.agent
        agency = maintenance_request.agent.agency
      end 
      #look up property 
      property = Property.find_by(property_address:params[:address][:address], agency_id:agency.id)
      #create property if none
      if property
        maintenance_request.update_attribute(:property_id, property.id)
        maintenance_request.reload
      else
        
        property = Property.create(property_address:params[:address][:address],  agency_id:agency.id)
        maintenance_request.update_attribute(:property_id, property.id)
        maintenance_request.reload
      end 


      respond_to do |format|
        format.json {render :json=>{address:params[:address][:address]}}
        
      end
    else
      respond_to do |format|
        format.json {render :json=>{errors:address.errors.to_hash(true).as_json}}
        
      end
    end 
  end

  private

  def address_params
    params.fetch(:address, {}).permit(:address,:maintenance_request_id)
  end

end