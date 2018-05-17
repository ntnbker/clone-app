class InsurancesController < ApplicationController
  def new
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
    @role = "Trady"
    @insurance = Insurance.new
  end

  def create
    
  end

end 