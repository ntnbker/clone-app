class LandlordActionsController < ApplicationController 
  before_action :require_login, only:[:fix_myself]

  before_action(only:[:fix_myself]) {allow("Landlord")}

  def fix_myself
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.action_status.update_attribute(:agent_status, "Maintenance Scheduled With Landlord")
    landlord = current_user.landlord 

    TenantNoticeLandlordSelfRepairEmailWorker.perform_async(maintenance_request.id, landlord.id)
    AgentNoticeLandlordSelfRepairEmailWorker.perform_async(maintenance_request.id)
    #send email to tenant
    #send email to agent
    #create reminder for landlord

    respond_to do |format|
      format.json {render :json=> {message:"We have sent an email to the agent and the tenant to inform them you will be fixing the issue. Thank you for your time."}}
    end 
  end


  def issue_resolved
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    maintenance_request.action_status.update_attribute(:agent_status, "Job Complete")
    landlord = current_user.landlord 

    #email agent to let them know it has been resolved

    respond_to do |format|
      format.json {render :json=> {message:"Thank you for resolving the tenants issue. We have sent an email to the agent to inform them the issue has been resolved. Thank you for your time."}}
    end 
  end

end 