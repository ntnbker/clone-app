class SummariesController < ApplicationController
	before_action :require_login

	def index
		@landlord = current_user.landlord
		@maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
	end

end
