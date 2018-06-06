
class LandlordReminderQuoteRecievedAwaitingLandlordApprovalWorker

  include Sidekiq::Worker

  def perform
    

    #this is where we will do the reminders for the agency adminins
    #we have to grab all of their MR with that particular type of status.
    #get the count and then send them an email for each agency admin on the system


    

    
     maintenance_requests = MaintenanceRequest.all.includes(:quotes,property:[:landlord]).joins(:action_status).where(:action_statuses => { :agent_status =>"Quote Received Awaiting Approval" }).distinct


     maintenance_requests.each do |maintenance_request|
      landlord = maintenance_request.property.landlord
      property = maintenance_request.property
      maintenance_request = maintenance_request
      quotes = maintenance_request.quotes

        quotes.each do |quote|

          if quote.forwarded_to_landlord == true
            LandlordMailer.reminder_quote_recieved_awaiting_landlord_approval(maintenance_request, landlord, property, quote).deliver
          end 
        end 

      #LandlordMailer.reminder_quote_recieved_awaiting_landlord_approval(maintenance_request, landlord, property).deliver
     end 
    

  end


  
end 
