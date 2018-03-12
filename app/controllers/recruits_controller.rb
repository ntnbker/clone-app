class RecruitsController < ApplicationController

  def new
    
  end

  def create
    
    email = params[:email].gsub(/\s+/, "").downcase
    jfmo = JfmoRequest.find_by(id:params[:jfmo_request_id])
    count = jfmo.tradie_participation_amount + 1
    jfmo.update_attribute(:tradie_participation_amount, count)
    maintenance_request_id = jfmo.maintenance_request_id
    JfmoEmailWorker.perform_async(maintenance_request_id)
    flash[:success] = "You have sent and email to #{email} to ask for a quote"
    redirect_to recruits_path
  end

  def index
    @jfmo_requests = JfmoRequest.all
  end

  def show
    @jfmo_request = JfmoRequest.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id:@jfmo_request.maintenance_request_id)

  end

end 