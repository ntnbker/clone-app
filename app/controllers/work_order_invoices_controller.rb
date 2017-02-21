class WorkOrderInvoicesController < ApplicationController
  
  def edit_trady_company_invoice
    @trady_company = TradyCompany.find_by(id:params[:trady_company_id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    
  end

    def update_trady_company_invoice
    
    @trady_company = TradyCompany.find_by(id:params[:trady_company][:trady_company_id])
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @trady.update_attribute(:email,params[:trady_company][:email]) 
    @trady.user.update_attribute(:email,params[:trady_company][:email]) 
    @maintenance_request_id = params[:trady_company][:maintenance_request_id]
    @trady_id = params[:trady_company][:trady_id]
    @quote_id = params[:trady_company][:quote_id]
    if @trady_company.update(trady_company_params)
      flash[:success] = "You have succesfully edited your company"
      redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id])  
    else
      flash[:danger] = "Sorry something went wrong please fill in the required fields"
      render :edit
    end 

  end

  def  new 
     @invoice = Invoice.new
     @trady_id = params[:trady_id] 
  end

end 