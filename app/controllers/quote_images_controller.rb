class QuoteImagesController < ApplicationController 

  def create
    
  end

  private

  def quote_image_params
   params.require(:picture).permit(:image, :trady_id, :maintenance_request_id, :quote_request_id)
  end

end 