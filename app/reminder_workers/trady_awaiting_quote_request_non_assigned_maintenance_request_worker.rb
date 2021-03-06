
class TradyAwaitingQuoteRequestNonAssignedMaintenanceRequestWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system

    ######WE HAVE TO DO THIS AGAIN IT SHOULD NOT BE BASED OFF OF THE STATUS OF MR BUT
    ###ON WHETHER A QUOTE REQUEST WAS SUBMITTED AND THAT THE MR IS ALSO STILL OPEN FOR QUOTES
    ## TO BE SUBMITTED. WE HAVE 

    ###FOR THE OTHER ONE WE HAVE TO MAKE SURE THAT THE TRADY IS THE SAME AS THE MR ASSIGNED TRADY AND
    ## THAT THEY HAVE AN OUTSTANDING QUOTE REQUEST
    

    
     # maintenance_requests = MaintenanceRequest.all.where(trady_id:nil).joins(:action_status).where(:action_statuses => { :agent_status =>"Awaiting Quote" }).pluck(:id)
     maintenance_requests = MaintenanceRequest.all.where(trady_id:nil).pluck(:id)
     quote_requests = QuoteRequest.all.includes(:trady, maintenance_request:[:property]).where(maintenance_request_id:maintenance_requests).where(quote_id:nil).distinct
     # quote_requests = QuoteRequest.all.includes(:trady, maintenance_request:[:property]).where(maintenance_request_id:maintenance_requests).joins(:quotes).where(quotes=>{}quote_request_id:nil)).distinct
     # joins(:action_status).where(:action_statuses => { :agent_status => params}).distinct
     # User.joins(:account).merge(Account.where(:active => true))
     
      quote_requests.each do |quote_request|
        #check to see if trady created a quote for that quote request. If he already did then dont reminder them.
        if quote_request.quote_id

          #do nothing
        else
          trady = quote_request.trady
          property = quote_request.maintenance_request.property
          maintenance_request = quote_request.maintenance_request
          #TradyMailer.reminder_awaiting_quote_request(maintenance_request, trady, property, quote_request).deliver
          if quote_request.maintenance_request.action_status.trady_status == "Job Complete"
            #do nothing
          else
            if trady.jfmo_participant == true && trady.customer_profile
              TradyMailer.reminder_awaiting_quote_request(maintenance_request, trady, property, quote_request).deliver
            elsif trady.jfmo_participant.nil? || trady.jfmo_participant == false
              TradyMailer.reminder_awaiting_quote_request(maintenance_request, trady, property, quote_request).deliver
            end 
          end 
          #the trady that did not finish signing up should not get an email reminder. If they are JFMO == true and customer_profile is there then remind them.
          #if the JFMO is nil then reminde them.  or else we will send them the wrong email to them. 
        end 
     end 
    

  end


  
end 
