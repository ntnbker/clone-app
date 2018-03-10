class JfmoTradiesController < ApplicationController
  def find_tradies
    binding.pry

    # Look for JFMO TRADIES that have service that is required by MR

    # if there are some 
    #   then create a quote reqeust for each one and then send them the quote request email
    # if there are none
    #   then send an email to me/leon for us to find tradies that are willing to give us a quote and sign up as JFMO tradies

    # end 



    # The JFMO button should only be clicked once per MR if the 
    #job has been given to a person the agent should not be able to click it again it should be hidden



    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.update_attribute(:jfmo_status, "Active")
    service = maintenance_request.service_type
    tradie_ids = Skill.where(skill:(service)).pluck(:trady_id)
    tradies = Tradies.where(jfmo_participant: true, id:tradie_ids)


    if tradies.count > 0
      tradies.each do |trady|
          quote_request = QuoteRequest.where(:trady_id=>@user.trady.id, :maintenance_request_id=>mr.id).first
          if quote_request
            #do nothing
          else
            QuoteRequest.create(trady_id:trady.id, maintenance_request_id:maintenance_request.id)
            TradyEmailWorker.perform_async(trady.id,maintenance_request.id)
          end

      end 

    else
      

    end 
  end
end 