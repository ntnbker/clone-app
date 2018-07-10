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

  def destroy
    Image.find_by(id:params[:id]).destroy
    image = Image.find_by(id:params[:id])
    if image
      respond_to do |format|
        format.json {render :json=>{:message=>"Somethign went wrong we could not delete your photo. Please refresh teh page and try again."}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{:message=>"You have successfully deleted that image."}}
      end 
      
    end
  end

  private

  def image_params
    params.require(:picture).permit(:image, :maintenance_request_id)
  end
end 