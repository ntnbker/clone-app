class TradiePaymentsController < ApplicationController


  def new
    @trady_company_id = params[:trady_company_id]
    @maintenance_request_id = params[:maintenance_request_id]
  end


end 