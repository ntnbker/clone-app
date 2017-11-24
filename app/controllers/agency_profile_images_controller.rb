class AgencyProfileImagesController < ApplicationController
  before_action :require_login, only:[:create,:update]

  before_action(only:[:create,:update]) {allow("AgencyAdmin")}
  

  
  def create
    
    
    @image =  AgencyProfileImage.new(image_params)

    if @image.save
      profile_image = @image.as_json(methods: :image_url)
      
      respond_to do |format|
        format.json {render :json=>{:profile_image=>profile_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@image.errors}}
      end
    end 
    
  end

  def update

    @image =  AgencyProfileImage.find_by(id:params[:picture][:agency_profile_image_id])

    if @image.update(image_params)
      profile_image = @image.as_json(methods: :image_url)
      
      respond_to do |format|
        format.json {render :json=>{:profile_image=>profile_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@image.errors}}
      end
    end 

  end

  private

  def image_params
    params.require(:picture).permit(:image, :agency_id, :agency_profile_image_id)
  end

  

end 