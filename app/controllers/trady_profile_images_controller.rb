class TradyProfileImagesController < ApplicationController
  def create
    
    
    @image =  TradyProfileImage.new(image_params)

    if @image.save
      profile_image = @image.as_json(methods: :image_url)
      
      respond_to do |format|
        format.json {render :json=>{:profile_image=>profile_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{error=>@image.errors}}
      end
    end 
    
  end

  def update

    @image =  TradyProfileImage.find_by(id:params[:picture][:trady_profile_image_id])

    if @image.update(image_params)
      profile_image = @image.as_json(methods: :image_url)
      
      respond_to do |format|
        format.json {render :json=>{:profile_image=>profile_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{error=>@image.errors}}
      end
    end 

  end

  private

  def image_params
    params.require(:picture).permit(:image, :trady_id, :trady_profile_image_id)
  end

end 