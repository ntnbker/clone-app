

class TradyAwaitingQuoteRequestAssignedMaintenanceRequestWorker
  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system


    

    
     maintenance_requests = MaintenanceRequest.all.where.not(trady_id: nil).joins(:action_status).where(:action_statuses => { :agent_status =>"Awaiting Quote" }).pluck(:id)
     quote_requests = QuoteRequest.all.includes(:trady, maintenance_request:[:property]).where(maintenance_request_id:maintenance_requests).distinct

      quote_requests.each do |quote_request|

        if quote_request.quote_id

          #do nothing
        else
          trady = quote_request.trady
          property = quote_request.maintenance_request.property
          maintenance_request = quote_request.maintenance_request
          TradyMailer.reminder_awaiting_quote_request(maintenance_request, trady, property).deliver
        end 
     end 
    

  end


  
end 
