class TradyCompaniesController < ApplicationController
  before_action(only: [:new]) { email_auto_login(params[:user_id]) }
  


  def new
    @trady_company = TradyCompany.new
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = @trady.id
    @company = @trady.trady_company if !nil
    @system_plan = params[:system_plan]
    @invoice_type = params[:invoice_type]
    @quote_type = params[:quote_type]
  end
  
  def create
    
    
    @trady_company = TradyCompany.new(trady_company_params)
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @trady_id = @trady.id
    @existing_company = TradyCompany.find_by(email:params[:trady_company][:email])
    @company = @trady.trady_company if !nil
    @maintenance_request_id = params[:trady_company][:maintenance_request_id]
    system_plan = params[:trady_company][:system_plan]
    @invoice_type = params[:trady_company][:invoice_type]
    

    if @existing_company
      @trady_company.perform_uniqueness_validation_of_company_email = false

      if @trady_company.valid?
        @existing_company.update(trady_company_params)
        @trady.update_attribute(:trady_company_id, @existing_company.id)
        @trady.update_attribute(:company_name,params[:trady_company][:company_name])
        @trady.update_attribute(:mobile,params[:trady_company][:mobile_number])
        
        

        if system_plan == "Invoice"
          if params[:trady_company][:invoice_type] == "pdf_file"
            redirect_to new_uploaded_invoice_path(trady_company_id:@trady_company.id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type, system_plan:system_plan)
          elsif params[:trady_company][:invoice_type] == "system_invoice"
            redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type, system_plan:system_plan)  
          end
        elsif system_plan == "Quote"
          if params[:trady_company][:quote_type] == "pdf_file"
            redirect_to new_uploaded_quote_path(trady_company_id:@trady_company.id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_type:@invoice_type, system_plan:system_plan)
          elsif params[:trady_company][:quote_type] == "system_quote"
            redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], quote_type:@invoice_type, system_plan:system_plan)  
          end
        end 
        
        # if params[:trady_company][:work_flow] == "Get Quote"#HERE WE HAVE TO SAY WHERE THE redirect should go. depending on what the form workflow says. 
        #   redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],trady_company_id:@trady_company.id)
        # elsif params[:trady_company][:work_flow] == "Work Order"
        #   redirect_to new_work_order_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])
        # end 
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
          

          if system_plan == "Invoice"
            if params[:trady_company][:invoice_type] == "pdf_file"
              redirect_to new_uploaded_invoice_path(trady_company_id:@trady_company.id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type, system_plan:system_plan)
            elsif params[:trady_company][:invoice_type] == "system_invoice"
              redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type, system_plan:system_plan)  
            end
          elsif system_plan == "Quote"
            if params[:trady_company][:quote_type] == "pdf_file"
              redirect_to new_uploaded_quote_path(trady_company_id:@trady_company.id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_type:@quote_type, system_plan:system_plan)
            elsif params[:trady_company][:quote_type] == "system_quote"
              redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], quote_type:@quote_type, system_plan:system_plan)  
            end
          end 
          # if params[:trady_company][:work_flow] == "Get Quote"#HERE WE HAVE TO SAY WHERE THE redirect should go. depending on what the form workflow says. 
          #   redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],trady_company_id:@trady_company.id)
          # elsif params[:trady_company][:work_flow] == "Work Order"
          #   redirect_to new_work_order_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])
          # end 
        

          flash[:success] = "You have added your company thank you"
        else
          flash[:danger] = "Please fill in below"
          render :new
        end
    end
  end 



  def edit
    #@trady_company = TradyCompany.find_by(id:params[:trady_company_id])
    @trady_company = TradyCompany.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @invoice_type= params[:invoice_type]
    @quote_type = params[:quote_type]
    @pdf_file_id = params[:pdf_file_id]
    @ledger_id = params[:ledger_id] 
    @system_plan = params[:system_plan]
  end

  def update
    
    @trady_company = TradyCompany.find_by(id:params[:trady_company][:trady_company_id])
    @trady = Trady.find_by(id:params[:trady_company][:trady_id])
    @trady.update_attribute(:email,params[:trady_company][:email]) 
    @trady.user.update_attribute(:email,params[:trady_company][:email]) 
    @maintenance_request_id = params[:trady_company][:maintenance_request_id]
    @trady_id = params[:trady_company][:trady_id]
    @quote_id = params[:trady_company][:quote_id]
    @maintenance_request = MaintenanceRequest.find_by(id:params[:trady_company][:maintenance_request_id])
    @ledger = Ledger.find_by(id:params[:trady_company][:ledger_id])
    @quote = Quote.find_by(id:params[:trady_company][:quote_id])
    @invoice_type = params[:trady_company][:invoice_type]
    system_plan = params[:trady_company][:system_plan]
    
    @pdf_files = UploadedInvoice.find_by(id:params[:trady_company][:pdf_file_id])
    @quote_pdf_files = UploadedQuote.find_by(id:params[:trady_company][:pdf_file_id])

    if @trady_company.update(trady_company_params)
      flash[:success] = "You have succesfully edited your company"
      
      
      if system_plan == "Invoice"
          if params[:trady_company][:invoice_type] == "pdf_file"
            if @pdf_files == nil
              redirect_to new_uploaded_invoice_path(trady_company_id:@trady_company.id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type, system_plan:system_plan)
            elsif @pdf_files != nil
              redirect_to edit_uploaded_invoice_path(@pdf_files,maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type, system_plan:system_plan)
            end 
      
          elsif params[:trady_company][:invoice_type] == "system_invoice"
            if @ledger == nil
              redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type, system_plan:system_plan)  
            elsif @ledger != nil
              redirect_to edit_invoice_path(@ledger, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type, system_plan:system_plan)
            end 
          end


        elsif system_plan == "Quote"
          
          if params[:trady_company][:quote_type] == "pdf_file"
            if @quote_pdf_files == nil
              redirect_to new_uploaded_quote_path(trady_company_id:@trady_company.id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_type:@invoice_type, system_plan:system_plan)
            elsif @quote_pdf_files != nil
              redirect_to edit_uploaded_quote_path(@quote_pdf_files,maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, quote_type:@quote_type, system_plan:system_plan)
            end    
          elsif params[:trady_company][:quote_type] == "system_quote"
            # if @quote == nil 
            #   redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], quote_type:@invoice_type, system_plan:system_plan)  
            # elsif @quote != nil
            #   redirect_to edit_quote_path(@ledger, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type, system_plan:system_plan)
            # end 
              
          end


        end







      # if params[:trady_company][:invoice_type] == "pdf_file"
        
      #   if @pdf_files == nil
      #     redirect_to new_uploaded_invoice_path(trady_company_id:@trady_company_id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type)
      #   elsif @pdf_files != nil
      #     redirect_to edit_uploaded_invoice_path(@pdf_files,maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type)
      #   end 
      
      # elsif params[:trady_company][:invoice_type] == "system_invoice"
      #   if @ledger == nil
      #     redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type)  
      #   elsif @ledger != nil
      #     redirect_to edit_invoice_path(@ledger, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type)
      #   end 
      # end







      














      

    else
      flash[:danger] = "Sorry something went wrong please fill in the required fields"
      render :edit
    end 

  end


























  # def edit
  #   @trady_company = TradyCompany.find_by(id:params[:id])
  #   @maintenance_request_id = params[:maintenance_request_id]
  #   @trady_id = params[:trady_id]
  # end

  # def update
    
  #   @trady_company = TradyCompany.find_by(id:params[:id])
  #   @trady = Trady.find_by(id:params[:trady_company][:trady_id])
     
  #   @maintenance_request_id = params[:trady_company][:maintenance_request_id]
  #   @trady_id = params[:trady_company][:trady_id]
    
  #   #if quote already exists we redirect them so they can continue with the form
  #   @quote = @trady.quotes.where(maintenance_request_id: params[:trady_company][:maintenance_request_id]).first


  #   if @trady_company.update(trady_company_params)
  #     flash[:success] = "You have succesfully edited your company"
  #     if @quote == nil
  #       redirect_to new_quote_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id])  
  #     elsif @quote != nil
  #       redirect_to edit_quote_path(@quote.id, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id])
  #     end   
  #   else
  #     flash[:danger] = "Sorry something went wrong please fill in the required fields"
  #     render :edit
  #   end 
  # end



  def edit_trady_company_invoice_workflow
    @trady_company = TradyCompany.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
  end

  def update_trady_company_invoice_workflow
    
  end



  

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










# def edit_trady_company_invoice
#     @trady_company = TradyCompany.find_by(id:params[:trady_company_id])
#     @maintenance_request_id = params[:maintenance_request_id]
#     @trady_id = params[:trady_id]
#     @quote_id = params[:quote_id]
#     @invoice_type= params[:invoice_type]
#     @pdf_file_id = params[:pdf_file_id]
#     @ledger_id = params[:ledger_id] 
#   end

#   def update_trady_company_invoice
    
#     @trady_company = TradyCompany.find_by(id:params[:trady_company][:trady_company_id])
#     @trady = Trady.find_by(id:params[:trady_company][:trady_id])
#     @trady.update_attribute(:email,params[:trady_company][:email]) 
#     @trady.user.update_attribute(:email,params[:trady_company][:email]) 
#     @maintenance_request_id = params[:trady_company][:maintenance_request_id]
#     @trady_id = params[:trady_company][:trady_id]
#     @quote_id = params[:trady_company][:quote_id]
#     @maintenance_request = MaintenanceRequest.find_by(id:params[:trady_company][:maintenance_request_id])
#     @ledger = Ledger.find_by(id:params[:trady_company][:ledger_id])
#     @invoice_type = params[:trady_company][:invoice_type]
#     #WE HAVE TO FIND THE RIGHT LEDGER
    
#     @pdf_files = UploadedInvoice.find_by(id:params[:trady_company][:pdf_file_id])
#     #@invoice = @trady.invoices.where(maintenance_request_id:@maintenance_request_id).first

#     if @trady_company.update(trady_company_params)
#       flash[:success] = "You have succesfully edited your company"
      
      
#       if params[:trady_company][:invoice_type] == "pdf_file"
        
#         if @pdf_files == nil
#           redirect_to new_uploaded_invoice_path(trady_company_id:@trady_company_id, maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type)
#         elsif @pdf_files != nil
#           redirect_to edit_uploaded_invoice_path(@pdf_files,maintenance_request_id:@maintenance_request_id,trady_id:@trady_id, quote_id:@quote_id, invoice_type:@invoice_type)
#         end 
      
#       elsif params[:trady_company][:invoice_type] == "system_invoice"
#         if @ledger == nil
#           redirect_to new_invoice_path(maintenance_request_id:params[:trady_company][:maintenance_request_id],trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type)  
#         elsif @ledger != nil
#           redirect_to edit_invoice_path(@ledger, maintenance_request_id:params[:trady_company][:maintenance_request_id], trady_id:params[:trady_company][:trady_id],quote_id:params[:trady_company][:quote_id], invoice_type:@invoice_type)
#         end 
#       end



      

#     else
#       flash[:danger] = "Sorry something went wrong please fill in the required fields"
#       render :edit
#     end 

#   end





















