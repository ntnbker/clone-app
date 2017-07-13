class QuotesController < ApplicationController
  before_action(only: [:show_quote]) { email_auto_login(params[:user_id]) }
  before_action :require_login
  before_action(only:[:new,:create,:edit,:update,:show,:show_quote]) {allow("Trady")}
  def new
    
    @quote = Quote.new
    @quote.quote_items.build
    @maintenance_request_id= params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
    @quote_type = params[:quote_type]
    @system_plan = params[:system_plan]

    
  end

  def create
    
    @quote = Quote.new(quote_params)
    @quote_type = params[:quote][:quote_type]
    @system_plan = params[:quote][:system_plan]

    # @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    # quote_request = QuoteRequest.where(:trady_id=>params[:quote][:trady_id], :maintenance_request_id=>params[:quote][:maintenance_request_id]).first
    

    if @quote.save
      @quote.calculate_quote_items_totals
      @quote.calculate_tax
      # @quote.update_attribute(:amount,@total)

      # if the quote id has been set then do nothing. if the quote_id in blank then fill it in. 
      # if quote_request.quote_id.blank?
      #   quote.update_attribute(:quote_id, @quote.id)
      # else  

      # end 

      redirect_to quote_path(@quote,maintenance_request_id:params[:quote][:maintenance_request_id], trady_id:params[:quote][:trady_id], quote_type:@quote_type, system_plan:@system_plan)
      #######TradyStatus.create(maintenance_request_id:params[:quote][:maintenance_request_id],status:"Awaiting Quote Approval")

    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:quote][:trady_id]
      @maintenance_request_id= params[:quote][:maintenance_request_id]
      render :new 
    end 
  end

  def edit
    @quote = Quote.find_by(id:params[:id])
    @quote_id = @quote.id
    @maintenance_request_id = params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @quote_type = params[:quote_type]
    @system_plan = params[:system_plan]
    @trady_company = @trady.trady_company

  end

  def update
    
    @quote = Quote.find_by(id:params[:id])
    # @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    @maintenance_request_id = params[:quote][:maintenance_request_id]
    @trady = Trady.find_by(id:params[:quote][:trady_id])
    
    @trady_company = @trady.trady_company
    @quote_type = params[:quote][:quote_type]
    @system_plan = params[:quote][:system_plan]

    if @quote.update(quote_params)
      @quote.calculate_quote_items_totals
      @quote.calculate_tax
      flash[:success] = "Your Quote has been updated"
      redirect_to quote_path(@quote,maintenance_request_id:params[:quote][:maintenance_request_id], trady_id:params[:quote][:trady_id], quote_type:@quote_type, system_plan:@system_plan)
    else
      flash[:danger] = "Sorry Something went wrong "
      render :edit
    end 
  end

  def show
    #this controller is to show the quote before sending in the quote email 
    @quote = Quote.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = params[:trady_id]
    @quote_type = params[:quote_type]
    @system_plan = params[:system_plan]

    if @maintenance_request.agency_admin == nil
      @agency = @maintenance_request.agent.agency
    else
      @agency = @maintenance_request.agency_admin.agency
    end

    if  @maintenance_request.property.landlord != nil
      @landlord = Landlord.find_by(id:@maintenance_request.property.landlord.id)
    end 
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

    if maintenance_request.agent == nil  
      name = "#{maintenance_request.agency_admin.first_name}" + " #{maintenance_request.agency_admin.last_name}"
    elsif maintenance_request.agency_admin == nil  
      name = "#{maintenance_request.agent.name}" + " #{maintenance_request.agent.last_name}"
    end
    
    if params[:status] == "Approved" 
      quotes.each do |quote|
        if quote.id == params[:quote_id].to_i && params[:status] == "Approved"
          
          trady = quote.trady 
          TradyQuoteApprovedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
          
          NotifyAgentQuoteApprovedEmailWorker.perform_async(maintenance_request.id)
          maintenance_request.update_attribute(:trady_id,trady.id)
          quote.update_attribute(:status, params[:status])
          maintenance_request.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Appointment Required")

          Log.create(maintenance_request_id:maintenance_request.id, action:"Quote has been approved", name: name)
          if maintenance_request.property.landlord
            NotifyLandlordQuoteApprovedEmailWorker.perform_async(maintenance_request.id)
          else
            #do nothing 
          end 

        else
          quote.update_attribute(:status, "Declined")
          trady = quote.trady
          
          #TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
        end 
      end
      TenantQuoteApprovedEmailWorker.perform_async(maintenance_request.id)
    elsif params[:status] == "Declined"
      quote = Quote.find_by(id: params[:quote_id])
      trady = quote.trady
      quote.update_attribute(:status,"Declined")

      Log.create(maintenance_request_id:maintenance_request.id, action:"Quote has been declined", name: name)

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
      maintenance_request.update_attribute(:trady_id, nil)
      Log.create(maintenance_request_id:maintenance_request.id, action:"Quote has been cancelled", name:name)

    end   

    respond_to do |format|
      format.json {render json: quotes.collect{ |quote| quote.as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}, :conversation=>{:include=>:messages}})}}
      
    end

    
    
  end

  def send_quote_email
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
    @quote = Quote.find_by(id:params[:quote_id])
    @trady = @quote.trady
    trady = @quote.trady

    quote_request = QuoteRequest.where(:trady_id=>@quote.trady.id, :maintenance_request_id=>@maintenance_request.id).first

    if quote_request.quote_id.blank?
      quote_request.update_attribute(:quote_id, @quote.id)
    else  

    end

    if @quote.delivery_status == false
      flash[:success] = "Your Quote has been sent Thank you"
      @quote.update_attribute(:delivery_status, true)

      Log.create(maintenance_request_id:@maintenance_request.id, action:"Quote has been Sent", name:trady.name)

      # if @landlord == nil 
        AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
        @maintenance_request.action_status.update_columns(agent_status:"Quote Received", action_category: "Action Required")
      # else

      #   #this stuff has to go into the new end point for when they forward the quote.
      #   AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
      #   # LandlordQuoteEmailWorker.perform_async(@maintenance_request.id, @landlord.id, @quote.id )
      #   @maintenance_request.action_status.update_columns(agent_status:"Quote Received", action_category: "Awaiting Action")
      # end 
    elsif @quote.delivery_status ==true
      redirect_to trady_maintenance_requests_path
    end 
      



  end



  def forward_quote
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
    @quote = Quote.find_by(id:params[:quote_id])
    @quote.update_attribute(:forwarded_to_landlord, true)

    if @maintenance_request.agent == nil  
      name = "#{@maintenance_request.agency_admin.first_name}" + " #{@maintenance_request.agency_admin.last_name}"
    elsif @maintenance_request.agency_admin == nil  
      name = "#{@maintenance_request.agent.name}" + " #{@maintenance_request.agent.last_name}"
    end


    LandlordQuoteEmailWorker.perform_async(@maintenance_request.id, @landlord.id, @quote.id )
    @maintenance_request.action_status.update_columns(agent_status:"Quote Received Awaiting Approval", action_category: "Awaiting Action")

    Log.create(maintenance_request_id:@maintenance_request.id, action:"Quote has been forwarded to landlord", name:name)
    respond_to do |format|
      format.json {render json: @quote}
    end 
  end

  def check_landlord
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
  end


  def landlord_requests_quote
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    LandlordRequestsQuoteEmailWorker.perform_async(maintenance_request.id)

    landlord = maintenance_request.property.landlord
    Log.create(maintenance_request_id:maintenance_request.id, action:"Landlord Requests Quote", name:landlord.name)

    maintenance_request.action_status.update_columns(agent_status:"Quote Requested", action_category:"Action Required")
    
    #Send Email to the agent  
    #change the status of the action table to the   
  end

  def landlord_decides_quote
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    quotes = maintenance_request.quotes.where(:delivery_status=>true)
    landlord = maintenance_request.property.landlord
    # @maintenance_request.quotes.where(:delivery_status=>true).as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}})
    if params[:status] == "Approved" 
      quotes.each do |quote|
        if quote.id == params[:quote_id].to_i && params[:status] == "Approved"
          
          trady = quote.trady 
          TradyQuoteApprovedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
          maintenance_request.update_attribute(:trady_id,trady.id)
          
          maintenance_request.action_status.update_columns(agent_status:"Quote Approved Tradie To Organise Appointment", trady_status:"Appointment Required")
          quote.update_attribute(:status, params[:status])
          NotifyAgentQuoteApprovedEmailWorker.perform_async(maintenance_request.id)
          NotifyLandlordQuoteApprovedEmailWorker.perform_async(maintenance_request.id)
          Log.create(maintenance_request_id:@maintenance_request.id, action:"Quote has been approved", name:landlord.name)
        else
          quote.update_attribute(:status, "Declined")
          trady = quote.trady
          Log.create(maintenance_request_id:@maintenance_request.id, action:"Quote has been declined", name:landlord.name)

          #EMAIL AGENT QUOTE DECLINED
          # TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
        end 
      end
    
      
    end 
    q = quotes.as_json(:include => {:trady => {:include => :trady_company}, :quote_items => {}})
    respond_to do |format|
      format.json {render :json => q}
      
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

