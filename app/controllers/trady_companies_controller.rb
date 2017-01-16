class TradyCompaniesController < ApplicationController
  def new
    @trady_company = TradyCompany.new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @company = Trady.find_by(id:@trady_id).trady_company if !nil
  end
  
  def create
    
    @trady_company = TradyCompany.new(trady_company_params)
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @existing_company = TradyCompany.find_by(company_name:params[:trady_company][:company_name])
    @company = @trady.trady_company if !nil
        
    if @existing_company
      @existing_company.update(trady_company_params)

      #@trady_company.perform_uniqueness_validation_of_company_name = false
      if @trady_company.valid?
          
        @trady.update_attribute(:trady_company_id, @existing_company.id)
        flash[:success] = "You have added your company thank you"
        redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],trady_company_id:@trady_company.id)
      else
        @trady_id = params[:trady_company][:trady_id]
        flash[:danger] = "Please fill in below"
        render :new
      end
      
    else 
        @trady_company.perform_uniqueness_validation_of_company_name = true
        if @trady_company.valid?
          
          @trady_company.save
          @trady.update_attribute(:trady_company_id, @trady_company.id)
          flash[:success] = "You have added your company thank you"
          redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])
        else
          flash[:danger] = "Please fill in below"
          render :new
        end
    end
  end 

  def edit
    @trady_company = TradyCompany.find_by(id:params[:id])
  end

  def update
    # binding.pry
    # # @trady_company = 
    # if @trady_company 
  end

  private
    def trady_company_params
      params.require(:trady_company).permit(:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email)
    end
end 



# if trady doesnt have a company then look for the company that they gave 
#   if it exists then upfate the update_attribute
#     if it doesnt exists then create and then update 