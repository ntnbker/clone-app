class ScreenTradiesController < ApplicationController
  
  def index
    @tradies = Trady.where(jfmo_participant:true, registration_status:"Pending").includes(:insurance, :license).as_json(:include=>{:insurance=>{}, :license=>{}})
  end

  def show
    @trady = Trady.includes(:insurance, :license,:skills).find_by(id:params[:id]).as_json(:include=>{:insurance=>{:methods=>[:image_url]}, :license=>{:methods=>[:image_url]}, :skills=>{}})
  end

  def screen
    
    trady = Trady.find_by(id:params[:id])
    if params[:skill]
      new_skills= params[:skill][:skill]
    end 
    if new_skills 
      current_skills = trady.services_provided
      #what was removed?
      removed_skills = current_skills - new_skills
      #what was added?
      added_skills = new_skills - current_skills

      removed_skills.each do |skill|
        Skill.where(trady_id: trady.id, skill: skill).destroy_all
      end 

      added_skills.each do |skill|
       Skill.create(trady_id:trady.id, skill:skill)
      end 
      
      

      if params[:insured] == "true" && params[:licensed] == "true" 
        trady.insurance.update_attribute(:insured, true)
        trady.license.update_attribute(:licensed, true)
        trady.update_attribute(:registration_status, "Complete")
        #send email to trady saying they have been approved
        TradyApprovedEmailWorker.perform_async(trady.id)
      elsif params[:insured] == "false" && params[:licensed] == "true" 
        trady.license.update_attribute(:licensed, true)
        if trady.insurance == nil
          #do nothing
        else
          trady.insurance.update_attribute(:insured, false)
        end
        
        trady.update_attribute(:registration_status, "Incomplete")
        #send email letting them know that we are missing their insurance
        TradyMissingInsuranceEmailWorker.perform_async(trady.id)
      elsif params[:insured] == "true" && params[:licensed] == "false"
        trady.insurance.update_attribute(:insured, true)
        
        if trady.license == nil 
          #do nothing
        else
          trady.license.update_attribute(:licensed, false)
        end
        
        trady.update_attribute(:registration_status, "Incomplete")
        TradyMissingLicenseEmailWorker.perform_async(trady.id)
        #send email letting them know that we are missing their license
      elsif params[:insured] == "false" && params[:licensed] == "false" 
        if trady.license == nil 
          #do nothing
        else
          trady.license.update_attribute(:licensed, false)
        end 

        if trady.insurance == nil
          #do nothing
        else
          trady.insurance.update_attribute(:insured, false)
        end
        
        trady.update_attribute(:registration_status, "Incomplete")
        TradyMissingDocumentsEmailWorker.perform_async(trady.id)
      end 
        

        
      flash[:success] = "Thank you for screening this tradie, they will receive an email to let them know what they need/can do now "
      redirect_to screen_tradies_path
    else
      
      
      respond_to do |format|
        format.json {render :json=>{errors:"Please choose at least one service from the list, thank you."}}
        format.html{render :edit_services}
      end
    end 

  end

end 

