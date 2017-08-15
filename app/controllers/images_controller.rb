class ImagesController < ApplicationController

  def update

    # maintenance_request = MaintenanceRequest.find_by(id:params[:picture][:maintenance_request_id])

    @image =  Image.new(image_params)
    binding.pry

    if image.save
      binding.pry
      gallery = "maintenance_request.get_image_urls"
      respond_to do |format|
        format.json {render :json=>{:all_images=>gallery}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{error=>image.errors}}
      end
    end 
    
    
  end

  private

  def image_params
    params.require(:maintenance_request).permit(images_attributes:[:id,:maintenance_request_id,:image,:_destoy])
  end
end 