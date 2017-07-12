class AgencyAdminOrAgentNewMaintenanceRequestNotificationTextingWorker

  include Sidekiq::Worker

  def perform(maintenance_request_id,url)
    
    maintenance_request = MaintenanceRequest.find(maintenance_request_id)
    user = maintenance_request.agency_admin.user
    # url = agency_admin_maintenance_request_url(@maintenance_request,user_id:user.id)
    
    AgentTexter.notify_agent_about_new_maintenance_request_text(maintenance_request,url)
    

  end


  
end 
