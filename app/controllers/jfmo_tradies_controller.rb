class JfmoTradiesController < ApplicationController
  def find_tradies
    
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    
    service = maintenance_request.service_type
    tradie_ids = Skill.where(skill:(service)).pluck(:trady_id)
    tradies = Trady.where(jfmo_participant: true, id:tradie_ids)
    jfmo_request = JfmoRequest.find_by(maintenance_request_id:maintenance_request.id)

    if maintenance_request.trady
      message = "Sorry this maintenance request already has a tradie that has been assigned the work."
      

    else
      #if tradies.count > 0
        


        tradies.each do |trady|
            quote_request = QuoteRequest.where(:trady_id=>trady.id, :maintenance_request_id=>maintenance_request.id).first
            if quote_request
              #do nothing
              message = "Please wait while we work hard to find you the best people we can. Thank you :)"
            else
              if maintenance_request.jfmo_status == "Passive"
                QuoteRequest.create(trady_id:trady.id, maintenance_request_id:maintenance_request.id)
                TradyEmailWorker.perform_async(trady.id,maintenance_request.id)
                #Log.create(maintenance_request_id:maintenance_request.id, action:"Just Find One Request")
                message = "Thank you, we will find qualified tradies from our network."

              elsif maintenance_request.jfmo_status == "Active"
                
                message = "You have already requested that we find you some tradies for competative quotes. Please wait while we work hard to find you the best people we can. Thank you :)"
              end 

            end

        end 

      #else
        
        if jfmo_request
          #do nothing
        else
          FindTradieEmailWorker.perform_async(maintenance_request.id)
          JfmoRequest.create(maintenance_request_id:maintenance_request.id)
          Log.create(maintenance_request_id:maintenance_request.id, action:"Just Find One Request")
        end 
      #end 
      



      maintenance_request.update_attribute(:jfmo_status, "Active")
      
    end 

    respond_to do |format|
      format.json {render :json=>{message:message}}
    end 

  end



end 