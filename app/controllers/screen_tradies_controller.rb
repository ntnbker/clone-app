class ScreenTradiesController < ApplicationController
  
  def index
    @tradies = Trady.where(jfmo_participant:true, registration_status:"Pending").includes(:insurance, :license).as_json(:include=>{:insurance=>{}, :license=>{}})
  end

  def show
    @trady = Trady.includes(:insurance, :license,:skills).find_by(id:params[:id]).as_json(:include=>{:insurance=>{:methods=>[:image_url]}, :license=>{:methods=>[:image_url], :skills=>{}}})
  end

end 

