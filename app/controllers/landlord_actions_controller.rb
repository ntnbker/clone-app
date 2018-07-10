class LandlordActionsController < ApplicationController 
  before_action :require_login
  before_action :require_role

  before_action(only:[:fix_myself, :issue_resolved]) {allow("Landlord")}

  def fix_myself
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.action_status.update_attribute(:agent_status, "Maintenance Scheduled With Landlord")
    maintenance_request.update_attribute(:landlord_fix_myself, true)
    landlord = current_user.landlord 

    TenantNoticeLandlordSelfRepairEmailWorker.perform_async(maintenance_request.id, landlord.id)
    AgentNoticeLandlordSelfRepairEmailWorker.perform_async(maintenance_request.id)
    
    respond_to do |format|
      format.json {render :json=> {message:"We have sent an email to the agent and the tenant to inform them you will be fixing the issue. Thank you for your time."}}
    end 
  end


  def issue_resolved
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.action_status.update_attribute(:agent_status, "Jobs Completed")
    QuoteRequest.expire(maintenance_request.id)
    landlord = current_user.landlord 
    
    AgentNoticeLandlordHasResolvedIssueWorker.perform_async(maintenance_request.id)
    #email agent to let them know it has been resolved




    respond_to do |format|
      format.json {render :json=> {message:"Thank you for resolving the tenant's issue. We have sent an email to the agent to inform them the issue has been resolved. Thank you for your time."}}
    end 
  end

end 