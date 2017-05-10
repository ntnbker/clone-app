class InvoiceOptionsController < ApplicationController
  before_action(only: [:show]) { email_auto_login(params[:user_id]) }

  def show
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @trady_company_id = params[:trady_company_id]
  end

  private

  def email_auto_login(id)

    if current_user == nil
      user = User.find_by(id:id)
      auto_login(user)
    end 
  end

end 