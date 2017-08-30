class SearchMaintenanceRequestsController < ApplicationController
  def search_maintenance_request
    user = current_user
    @link = ''

    if params[:query]
      if current_user.agency_admin && current_user.logged_in_as("AgencyAdmin")
        @link = '/agency_admin_maintenance_requests'
        m = MaintenanceRequest.search(params[:query],includes: [:property] ,where: {agency_admin_id: current_user.agency_admin.id})
        @maintenance_requests = m.as_json(:include=>{:property=>{}},methods: :get_image_urls)
      elsif current_user.agent && current_user.logged_in_as("Agent")
        m = MaintenanceRequest.search(params[:query],includes: [:property] ,where: {agent_id: current_user.agent.id})
        @maintenance_requests = m.as_json(:include=>{:property=>{}},methods: :get_image_urls)
        @link = '/agent_maintenance_requests'
      end
    else
      @maintenance_requests = []
    end

    respond_to do |format|
      format.html
      format.json { render json: { maintenance_requests: @maintenance_requests, link: @link } }
    end
  end
end
