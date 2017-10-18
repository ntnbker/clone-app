class AgentProfileImagesController < ApplicationController
  before_action :require_login, only:[:create]
  before_action(only:[:show,:index]) {allow("Agent")}
  
  def create
    @image =  AgentProfileImage.new(image_params)

    if @image.save
      profile_image = @image.as_json(methods: :image_url)
      respond_to do |format|
        format.json {render :json=>{:profile_image=>profile_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{error=>image.errors}}
      end
    end 
    
  end

  def update
    
  end


  def image_params
    params.require(:picture).permit(:image, :agent_id)
  end

end 