class QuotesController < ApplicationController
  
  def new
    
    @quote = Quote.new
    @quote.quote_items.build
    @maintenance_request_id= params[:maintenance_request_id]
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_company = TradyCompany.find_by(id:@trady.trady_company.id)
  end

  def create
    
    @quote = Quote.new(quote_params)
    
    @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    
    if @quote.save
      @quote.update_attribute(:amount,@total)
      binding.pry
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
    @quote = Quote.find_by(id:params[:quote_id])
  end

  def quote_status
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    quotes = maintenance_request.quotes
    if params[:status] == "Approved" 
      quotes.each do |quote|
        if quote.id == params[:quote_id].to_i && params[:status] == "Approved"
          
          trady = quote.trady 
          TradyQuoteApprovedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
          quote.update_attribute(:status, params[:status])
        else
          quote.update_attribute(:status, "Declined")
          trady = quote.trady
          
          TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
        end 
      end
    elsif params[:status] == "Declined"
      quote = Quote.find_by(id: params[:quote_id])
      trady = quote.trady
      quote.update_attribute(:status,"Declined")
      TradyQuoteDeclinedEmailWorker.perform_async(quote.id,trady.id, maintenance_request.id)
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


  end

  def send_quote_email
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
    @quote = Quote.find_by(id:params[:quote_id])
    @quote.update_attribute(:delivery_status, true) 
    flash[:success] = "Your Quote has been sent Thank you"
    if @landlord == nil 
      AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
    else
      AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
      LandlordQuoteEmailWorker.perform_async(@maintenance_request.id, @landlord.id, @quote.id )
    end 
      
  end


  def landlord_requests_quote
    #maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id]
  end


  private
  
  def quote_params
    params.require(:quote).permit(:id, :trady_id,:status, :delivery_status, :maintenance_request_id,quote_items_attributes:[:id,:amount,:item_description, :_destroy])
  end

  
end 

