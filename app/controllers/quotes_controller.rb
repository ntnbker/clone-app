class QuotesController < ApplicationController
  before_action(only: [:show_quote]) { email_auto_login(params[:user_id]) }
  def new
    
    @quote = Quote.new
    @quote.quote_items.build
    @maintenance_request_id= params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
  end

  def create
    
    @quote = Quote.new(quote_params)
    
    # @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    
    if @quote.save
      @quote.calculate_quote_items_totals
      @quote.calculate_tax
      # @quote.update_attribute(:amount,@total)
      redirect_to quote_path(@quote,maintenance_request_id:params[:quote][:maintenance_request_id], trady_id:params[:quote][:trady_id])
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:quote][:trady_id]
      @maintenance_request_id= params[:quote][:maintenance_request_id]
      render :new 
    end 
  end

  def edit
    @quote = Quote.find_by(id:params[:id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    
    @trady_company = @trady.trady_company
  end

  def update
    
    @quote = Quote.find_by(id:params[:id])
    @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    @maintenance_request_id = params[:quote][:maintenance_request_id]
    @trady = Trady.find_by(id:params[:quote][:trady_id])
    
    @trady_company = @trady.trady_company

    if @quote.update(quote_params)
      @quote.update_attribute(:amount,@total)
      flash[:success] = "Your Quote has been updated"
      redirect_to quote_path(@quote,maintenance_request_id:params[:quote][:maintenance_request_id], trady_id:params[:quote][:trady_id])
    else
      flash[:danger] = "Sorry Something went wrong "
      render :edit
    end 
  end

  def show
    #this controller is to show the quote before sending in the quote email 
    @quote = Quote.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
    @trady_id = params[:trady_id] 
  end

  def show_quote
    #this controller is to show the landlord the quote on the website.
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @quotes = @maintenance_request.quotes 
    #@quote = Quote.find_by(id:params[:quote_id])
  end

  def quote_status
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    quotes = maintenance_request.quotes.where(:delivery_status=>true)

    if params[:status] == "Approved" 
      quotes.each do |quote|
        if quote.id == params[:quote_id].to_i && params[:status] == "Approved"
          
          trady = quote.trady 
          TradyQuoteApprovedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
          maintenance_request.update_attribute(:trady_id,trady.id)
          quote.update_attribute(:status, params[:status])
        else
          quote.update_attribute(:status, "Declined")
          trady = quote.trady
          
          #TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
        end 
      end
    elsif params[:status] == "Declined"
      quote = Quote.find_by(id: params[:quote_id])
      trady = quote.trady
      quote.update_attribute(:status,"Declined")
      #TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
      #email the person who got declined
    elsif params[:status] == "Restore"
      quote = Quote.find_by(id: params[:quote_id])
      quote.update_attribute(:status,"Active")
      #email the person who got restored?
    end 

    if params[:status] == "Cancel"
      
      quote = Quote.find_by(id: params[:quote_id])
      quote.update_attribute(:status,"Cancelled")
      TradyJobCancelledEmailWorker.perform_async(quote.trady.id, maintenance_request.id)

    end   

    respond_to do |format|
      format.json {render json: quotes.collect{ |quote| quote.as_json(:include => [:trady])}}
      
    end

    
    
  end

  def send_quote_email
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
    @quote = Quote.find_by(id:params[:quote_id])
    @quote.update_attribute(:delivery_status, true)

    flash[:success] = "Your Quote has been sent Thank you"
    if @landlord == nil 
      AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
      @maintenance_request.action_status.update_columns(agent_status:"Quote Received", action_category: "Action Required")
    else

      #this stuff has to go into the new end point for when they forward the quote.
      AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
      LandlordQuoteEmailWorker.perform_async(@maintenance_request.id, @landlord.id, @quote.id )
      @maintenance_request.action_status.update_columns(agent_status:"Quote Received Awaiting Approval", action_category: "Awaiting Action")
    end 
  end

  def forward_quote
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
    @quote = Quote.find_by(id:params[:quote_id])
    LandlordQuoteEmailWorker.perform_async(@maintenance_request.id, @landlord.id, @quote.id )
    @maintenance_request.action_status.update_columns(agent_status:"Quote Received Awaiting Approval", action_category: "Awaiting Action")
  end

  def check_landlord
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
  end


  def landlord_requests_quote
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    LandlordRequestsQuoteEmailWorker.perform_async(maintenance_request.id)
    
    maintenance_request.action_status.update_columns(agent_status:"Quote Requested", action_category:"Action Required")
    
    #Send Email to the agent  
    #change the status of the action table to the   
  end

  def landlord_decides_quote
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    quotes = maintenance_request.quotes
    if params[:status] == "Approved" 
      quotes.each do |quote|
        if quote.id == params[:quote_id].to_i && params[:status] == "Approved"
          
          trady = quote.trady 
          TradyQuoteApprovedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
          maintenance_request.update_attribute(:trady_id,trady.id)
          #EMAIL AGENT QUOTE APPROVED
          maintenance_request.action_status.update_attribute(:agent_status,"Quote Approved Tradie To Organise Appointment")
          quote.update_attribute(:status, params[:status])
        else
          quote.update_attribute(:status, "Declined")
          trady = quote.trady
          #EMAIL AGENT QUOTE DECLINED
          TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
        end 
      end
    # elsif params[:status] == "Declined"
    #   quote = Quote.find_by(id: params[:quote_id])
    #   trady = quote.trady
    #   quote.update_attribute(:status,"Declined")
    #   TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
    #   #email the person who got declined
    
    end 
    
  end


  private
  
  def quote_params
    params.require(:quote).permit(:id, :trady_id,:status, :delivery_status, :tax,:maintenance_request_id,quote_items_attributes:[:id,:amount,:item_description, :_destroy, :hours, :pricing_type])
  end

  def email_auto_login(id)
      if current_user == nil
        user = User.find_by(id:id)
        auto_login(user)
      end 
  end

  
end 

