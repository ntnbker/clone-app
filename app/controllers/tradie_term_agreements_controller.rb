class TradieTermAgreements < ApplicationController
  def new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_company_id = params[:trady_company_id]
    @trady_id = params[:trady_id]

    
  end

  def create
    
  end

end 