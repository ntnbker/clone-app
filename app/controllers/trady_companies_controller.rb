class TradyCompaniesController < ApplicationController
  def new
    @trady_company = TradyCompany.new
    @maintenance_request_id = params[:maintenance_request_id]
    
    @trady = Trady.find_by(id:params[:trady_id])
    @company = @trady.trady_company if !nil
    
  end
  
  def create
    

    @trady_company = TradyCompany.new(trady_company_params)
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @existing_company = TradyCompany.find_by(company_name:params[:trady_company][:email])
    @company = @trady.trady_company if !nil
    
    #change
    

    if @existing_company
      #@existing_company.update(trady_company_params)

      @trady_company.perform_uniqueness_validation_of_company_email = true

      if @trady_company.valid?
        @existing_company.update(trady_company_params)
        #@trady.user.update_attribute(:email,params[:trady_company][:email])  
        @trady.update_attribute(:trady_company_id, @existing_company.id)
        #@trady.update_attribute(:email,params[:trady_company][:email])
        flash[:success] = "You have added your company thank you"
        redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],trady_company_id:@trady_company.id)
      else
        @trady_id = params[:trady_company][:trady_id]
        flash[:danger] = "Please fill in below"
        render :new
      end
      
    else 
        @trady_company.perform_uniqueness_validation_of_company_email = false
        if @trady_company.valid?
          
          @trady_company.save
          @trady.update_attribute(:trady_company_id, @trady_company.id)
          @trady.update_attribute(:email,params[:trady_company][:email])
          @trady.user.update_attribute(:email,params[:trady_company][:email])
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
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
  end

  def update
    
    @trady_company = TradyCompany.find_by(id:params[:id])
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
     
    @maintenance_request_id = params[:trady_company][:maintenance_request_id]
    @trady_id = params[:trady_company][:trady_id]
     
    if @trady_company.update(trady_company_params)
      flash[:success] = "You have succesfully edited your company"
      redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])  
    else
      flash[:danger] = "Sorry something went wrong please fill in the required fields"
      render :edit
    end 
  end


  def create_trady_company
    
  end

  private
    def trady_company_params
      params.require(:trady_company).permit(:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email)
    end
end 



# if trady doesnt have a company then look for the company that they gave 
#   if it exists then upfate the update_attribute
#     if it doesnt exists then create and then update 