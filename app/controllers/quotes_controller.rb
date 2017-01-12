class QuotesController < ApplicationController
  
  def new
    
    @quote = Quote.new
    @quote.quote_items.build
    @trady_id = params[:trady_id]
    @maintenance_request_id= params[:maintenance_request_id]
  end

  def create
    params
    @quote = Quote.new(quote_params)
    
    @total = @quote.calculate_total(params[:quote][:quote_items_attributes])
    binding.pry
    if @quote.save
      @quote.update_attribute(:amount,@total)
      binding.pry
      redirect_to quote_path(@quote)
    else
      flash[:danger] = "Please Fill in a Minumum of one item"
      @trady_id = params[:quote][:trady_id]
      @maintenance_request_id= params[:quote][:maintenance_request_id]
      render :new 
    end 
  end

  def show
    @quote = Quote.find_by(id:params[:id])
  end

  def send_quote_email
    
  end
  private
  def quote_params
    params.require(:quote).permit(:id, :trady_id,:maintenance_request_id,quote_items_attributes:[:id,:amount,:item_description, :_destroy])
  end

  
end 

