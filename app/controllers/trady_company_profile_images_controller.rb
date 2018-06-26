class TradyCompanyProfileImagesController < ApplicationController
  before_action :require_login, only:[:create,:update]
  before_action :require_role
  before_action(only:[:create,:update]) {allow("Trady")}

  def create
    
    
    @image =  TradyCompanyProfileImage.new(image_params)

    if @image.save
      company_image = @image.as_json(methods: :image_url)
      
      respond_to do |format|
        format.json {render :json=>{:company_image=>company_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@image.errors}}
      end
    end 
    
  end

  def update

    @image =  TradyCompanyProfileImage.find_by(id:params[:picture][:trady_company_profile_image_id])

    if @image.update(image_params)
      company_image = @image.as_json(methods: :image_url)
      
      respond_to do |format|
        format.json {render :json=>{:company_image=>company_image}}
      end 
    else
      respond_to do |format|
        format.json {render :json=>{:error=>@image.errors}}
      end
    end 

  end


  def image_params
    params.require(:picture).permit(:image, :trady_company_id, :trady_company_profile_image_id)
  end
end 