class QuotesController < ApplicationController
  
  def new
    
    @quote = Quote.new
    @quote.quote_items.build
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
  end

  def create
    
    @quote = Quote.new(quote_params)
    
    @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    
    if @quote.save
      @quote.update_attribute(:amount,@total)
      
      redirect_to quote_path(@quote,maintenance_request_id:params[:quote][:maintenance_request_id])
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:quote][:trady_id]
      @maintenance_request_id= params[:quote][:maintenance_request_id]
      render :new 
    end 
  end

  def show
    
    @quote = Quote.find_by(id:params[:id])
    @maintenance_request = MaintenanceRequest.find_by(id: params[:maintenance_request_id])

  end

  def show_quote
    @quote = Quote.find_by(id:params[:quote_id])
    
  end

  def send_quote_email
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @landlord = @maintenance_request.property.landlord
    @quote = Quote.find_by(id:params[:quote_id])
     
    flash[:success] = "Your Quote has been sent Thank you"
    if @landlord == nil 
      AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
    else
      AgentQuoteEmailWorker.perform_async(@maintenance_request.id, @quote.id )
      LandlordQuoteEmailWorker.perform_async(@maintenance_request.id, @landlord.id, @quote.id )
    end 
      
  end


  private
  def quote_params
    params.require(:quote).permit(:id, :trady_id,:maintenance_request_id,quote_items_attributes:[:id,:amount,:item_description, :_destroy])
  end

  
end 

