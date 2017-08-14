class ImagesController < ApplicationController

  def update
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])

    image =  Image.create(image_params)
    gallery = maintenance_request.get_image_urls
    response_to do |format|
      format.json {render :json=>{:all_images=>gallery}}
    end 
  end

  private

  def image_params
    params.require(:image).permit(:image, :maintenance_request_id)
  end
end 