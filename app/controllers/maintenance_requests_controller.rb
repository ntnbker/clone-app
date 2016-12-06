class MaintenanceRequestsController < ApplicationController
  def new
    @maintenance_request = MaintenanceRequest.new
    @maintenance_request.access_contacts.build
    @maintenance_request.availabilities.build
  end

end 