class QuotesController < ApplicationController
  def new
    @quote = Quote.new
    @quote.quote_items.build
  end

  def create
    @quote = Quote.new(quote_params)

    


  end
  private
  def quote_params
    params.require(:quote).permit(quote_items_attributes:[:id,:amount,:item_description])
  end
end 