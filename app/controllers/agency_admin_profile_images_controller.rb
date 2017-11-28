class AgencyAdminProfileImagesController < ApplicationController
  before_action :require_login, only:[:create]

  before_action(only:[:show,:index]) {allow("AgencyAdmin")}
  
  def create
    
    
    @image =  AgencyAdminProfileImage.new(image_params)

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

    @image =  AgencyAdminProfileImage.find_by(id:params[:picture][:agency_admin_profile_image_id])

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


  def image_params
    params.require(:picture).permit(:image, :agency_admin_id, :agency_admin_profile_image_id)
  end
end 