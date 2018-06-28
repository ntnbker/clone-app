class ImagesController < ApplicationController
  before_action :require_login, only:[:show,:index]
  before_action :require_role
  
  def update

    maintenance_request = MaintenanceRequest.find_by(id:params[:picture][:maintenance_request_id])
    image =  Image.new(image_params)

    if image.save
      gallery = maintenance_request.get_image_urls
      respond_to do |format|
        format.json {render :json=>{:all_images=>gallery}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{:error=>image.errors}}
      end
    end 
    
    
  end

  private

  def image_params
    params.require(:picture).permit(:image, :maintenance_request_id)
  end
end 