class TradyCompaniesController < ApplicationController
  before_action(only: [:new]) { email_auto_login(params[:user_id]) }
  def new
    @trady_company = TradyCompany.new
    @maintenance_request_id = params[:maintenance_request_id]
    
    @trady = Trady.find_by(id:params[:trady_id])
    @company = @trady.trady_company if !nil
    
  end
  
  def create
    

    @trady_company = TradyCompany.new(trady_company_params)
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @existing_company = TradyCompany.find_by(email:params[:trady_company][:email])
    
    
    @company = @trady.trady_company if !nil
    
    
    

    if @existing_company
      #@existing_company.update(trady_company_params)

      @trady_company.perform_uniqueness_validation_of_company_email = false

      if @trady_company.valid?
        @existing_company.update(trady_company_params)
        #@trady.user.update_attribute(:email,params[:trady_company][:email])  
        @trady.update_attribute(:trady_company_id, @existing_company.id)
        @trady.update_attribute(:company_name,params[:trady_company][:company_name])
        @trady.update_attribute(:mobile,params[:trady_company][:mobile_number])
        flash[:success] = "You have added your company thank you"
        
        
        if params[:trady_company][:work_flow] == "Get Quote"#HERE WE HAVE TO SAY WHERE THE redirect should go. depending on what the form workflow says. 
          redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],trady_company_id:@trady_company.id)
        elsif params[:trady_company][:work_flow] == "Work Order"
          redirect_to new_work_order_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])
        end 
      else
        @trady_id = params[:trady_company][:trady_id]
        flash[:danger] = "Please fill in below"
        render :new
      end
      
    else 
        @trady_company.perform_uniqueness_validation_of_company_email = true
        if @trady_company.valid?
          
          @trady_company.save
          @trady.update_attribute(:trady_company_id, @trady_company.id)
          @trady.update_attribute(:mobile,params[:trady_company][:mobile_number])
          @trady.update_attribute(:company_name,params[:trady_company][:company_name])
          # @trady.update_attribute(:email,params[:trady_company][:email])
          # @trady.user.update_attribute(:email,params[:trady_company][:email])
          flash[:success] = "You have added your company thank you"
          if params[:trady_company][:work_flow] == "Get Quote"#HERE WE HAVE TO SAY WHERE THE redirect should go. depending on what the form workflow says. 
            redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],trady_company_id:@trady_company.id)
          elsif params[:trady_company][:work_flow] == "Work Order"
            redirect_to new_work_order_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])
          end 
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
    
    #if quote already exists we redirect them so they can continue with the form
    @quote = @trady.quotes.where(maintenance_request_id: params[:trady_company][:maintenance_request_id]).first


    if @trady_company.update(trady_company_params)
      flash[:success] = "You have succesfully edited your company"
      if @quote == nil
        redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])  
      elsif @quote != nil
        redirect_to edit_quote_path(@quote.id, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id])
      end   
    else
      flash[:danger] = "Sorry something went wrong please fill in the required fields"
      render :edit
    end 
  end



  def edit_trady_company_invoice_workflow
    @trady_company = TradyCompany.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
  end

  def update_trady_company_invoice_workflow
    
  end


  # def trady_company_router
  #   @trady = Trady.find_by(id:params[:trady_id])

  #   @existing_company = TradyCompany.find_by(id:@trady.trady_company.id)

  #   if @existing_company
  #     redirect_to edit company path
  #   else
  #     redirect_to new trady company path
  #   end 
  # end


  

  private
    
    def trady_company_params
      params.require(:trady_company).permit(:trady_id,:maintenance_request_id,:company_name,:trading_name,:abn,:gst_registration,:mailing_address_same,:address,:mailing_address ,:mobile_number,:email, :account_name, :bsb_number, :bank_account_number, :work_flow)
    end

    def email_auto_login(id)
      if current_user == nil
        user = User.find_by(id:id)
        auto_login(user)
      end 
    end


end 



# if trady doesnt have a company then look for the company that they gave 
#   if it exists then upfate the update_attribute
#     if it doesnt exists then create and then update 