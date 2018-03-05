class AgencyTermAgreementsController < ApplicationController
  
  def new
    @agency_id = params[:agency_id]
  end

  def create
    if  params[:terms_and_conditions] == "true" 
      agency = Agency.find_by(id:params[:agency_id])
      CustomerProfile.create(agency_id:agency.id, terms_and_conditions: true)

      
      redirect_to root_path
    elsif params[:terms_and_conditions] == "false"
      @agency_id = params[:agency_id]
       respond_to do |format|
          format.json{render :json=>{errors:"You must agree to the terms and conditions to join maintenance app."}}
          format.html{render :new}
      end
    end 
  end

end 