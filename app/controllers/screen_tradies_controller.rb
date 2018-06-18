class ScreenTradiesController < ApplicationController
  
  def index
    @tradies = Trady.where(jfmo_participant:true, registration_status:"Pending").includes(:insurance, :license).as_json(:include=>{:insurance=>{}, :license=>{}})
  end

  def show
    @trady = Trady.includes(:insurance, :license,:skills).find_by(id:params[:id]).as_json(:include=>{:insurance=>{:methods=>[:image_url]}, :license=>{:methods=>[:image_url]}, :skills=>{}})
  end

  def screen
    

    # if both license and insurnace are yes then update both to true and also add trady registratino to "Complete" 
    # Then send them an email letting them know they have been approved

    # if the license is good but not the insurance update the license to true , dont update insurance and update trady registratino to "Incomplete"
    # Then send them an email tellign them we need the insurance

    # if the insurance is good but not the license update the insurnace to true, dont update license and update trady registratino to "Incomplete"
    # Then send them an email tellign them we need the license


    # do the skills here 
    
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
      
      
      if params[:insured] == true && params[:licensed] == true 
        trady.insurance.update_attribute(:insured, true)
        trady.license.update_attribute(:licensed, true)
        trady.update_attribute(:registration_status, "Complete")
        #send email to trady saying they have been approved
      elsif params[:insured] == false && params[:licensed] == true 
        trady.license.update_attribute(:licensed, true)
        trady.update_attribute(:registration_status, "Incomplete")
        #send email letting them know that we are missing their insurance
      elsif params[:insured] == true && params[:licensed] == false
        trady.insured.update_attribute(:insured, true)
        trady.update_attribute(:registration_status, "Incomplete")
        #send email letting them know that we are missing their license
      elsif params[:insured] == false && params[:licensed] == false 
        if trady.license == nil 
          #do nothing
        else
          trady.license.update_attribute(:licensed, false)

        end 

        if trady.insurance == nil
          #do nothing
        else
          trady.insured.update_attribute(:insured, true)
          
        end
        trady.update_attribute(:registration_status, "Incomplete")
        #send and email saying we are missing information. 
      end 
        

        






      #redirect_to new_tradie_term_agreement_path(maintenance_request_id:params[:maintenance_request_id], trady_company_id:params[:trady_company_id], trady_id:params[:trady_id])
      flash[:success] = "Thank you for screening this tradie, he will receive an email to let them know what they need/can do now "
      redirect_to screen_tradies_path
    else
      
      
      respond_to do |format|
        format.json {render :json=>{errors:"Please choose at least one service from the list below, thank you."}}
        format.html{render :edit_services}
      end
    end 

  end

end 

