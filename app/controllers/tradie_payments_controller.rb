class TradiePaymentsController < ApplicationController


  def new
    (ledger_id:@ledger.id,maintenance_request_id:params[:ledger][:maintenance_request_id], trady_company_id:trady.trady_company.id, trady_id:trady.id, quote_id:params[:ledger][:quote_id], invoice_type:@invoice_type, system_plan:"Invoice" )


    @ledger_id = params[:ledger_id]
    @trady_company_id = params[:trady_company_id]
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @invoice_type = params[:invoice_type]
    @system_plan = params[:system_plan]
  end


end 