class ReminderKillersController < ApplicationController

  def stop_quote_request_reminder
    
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])

    @maintenance_request.action_status.update_columns(agent_status:"Quote Received",trady_status:"Awaiting Quote Approvals")
    quote_request = QuoteRequest.find_by(id:params[:quote_request_id])
    quote_request.update_attribute(:quote_sent, true)


    if params[:role] == "Agent"
      @quote_requests = @maintenance_request.quote_requests.as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}, :conversation=>{:include=>:messages}}} })
    elsif params[:role] == "Trady"
      @quote_requests = QuoteRequest.where(trady_id:params[:trady_id], :maintenance_request_id=>@maintenance_request.id).as_json(:include => {:trady => {:include => {:trady_profile_image=>{:methods => [:image_url]},:trady_company=>{:include=>{:trady_company_profile_image=>{:methods => [:image_url]}}}}}, :quotes=>{:include=> {:quote_image=>{:methods=>[:image_url]},:quote_items=>{}, :conversation=>{:include=>:messages}}} })
    end 


    respond_to do |format|
      format.json{ render :json=>{quote_requests:@quote_requests}}
    end 
  end


  def stop_appointment_reminder
    
    
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])

    @maintenance_request.action_status.update_columns(agent_status:"Maintenance Scheduled - Awaiting Invoice",trady_status:"Job Booked")
  


    respond_to do |format|
      format.json{ render :json=>{message:"Thank you for letting us know an appointment has been made with the tenant to get the job done."}}
    end 
  end

end 