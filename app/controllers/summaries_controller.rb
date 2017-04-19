class SummariesController < ApplicationController
	before_action :require_login

	def index
		@landlord = current_user.landlord
		@maintenance_request = MaintenanceRequest.find_by(id:params[:id] ? params[:id] : 1)
	end

end