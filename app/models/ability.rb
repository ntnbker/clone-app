class Ability
  include CanCan::Ability

  def initialize(user)
    #the default alias_actions for the other actions are the same as the RESTFUL routes
    #wanted to be specific about index and show defaults are one read method which I dont want 
    alias_action :index, :show, :to => :read_index
    alias_action :show, :to => :read_show
    
    # Define abilities for the passed in user here. For example:
    #
      @user = user || User.new # guest user (not logged in)

      
      if @user.is_god? && @user.logged_in_as_god?
        can :manage, :all
        can :read_show, Agent
        
        can :read, Service
        
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :read_show, MaintenanceRequest
      end

      if @user.is_agent? && @user.logged_in_as_agent?
        can :read_show, Agent
        
        can :read, Service
        
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :read_show, MaintenanceRequest
        can :ordered_maintenance_requests, :maintenance_request
        can :index, :agent_maintenance_request
        can :show, :agent_maintenance_request
      end

      if @user.is_agency_admin? && @user.logged_in_as_agency_admin?
        can :read_show, Agent
        
        can :read, Service
        
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :read_show, MaintenanceRequest

        can :show, :maintenance_request
        can :index, :maintenance_request
        can :create, :maintenance_request

        can :create, :agency_admin
        can :new, :agency_admin
        # can :new, AgencyAdmin
        # can :read_show, AgencyAdmin

        


        #can [:new, :create, :show], :agent_maintenance_requests
        can :show, :agency_admin
        can :new, :agency_admin
        can :maintenance_request_index, :agency_admin 
        can :ordered_maintenance_requests, :maintenance_request
      end

      if @user.is_landlord? && @user.logged_in_as_landlord?
        can :show, :maintenance_request
      end 

      if @user.is_tenant? && @user.logged_in_as_tenant?
        
        can :read_index, Tenant
        can :read_show, Tenant
        can :read_show, MaintenanceRequest
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :index, :maintenance_request
        can :show, :maintenance_request
        can :ordered_maintenance_requests, :maintenance_request
        can :edit, :appointment
      end 

      if @user.is_trady? && @user.logged_in_as_trady?
        
        
        can :index, :maintenance_request
        can :show, :maintenance_request
        can :ordered_maintenance_requests, :maintenance_request
      end 

      if @user.logged_in_as_nobody?
        
        # can :new, MaintenanceRequest
        can :new, AgencyAdmin
        can :create, AgencyAdmin
        can [:new,:create], :agency_admins
        can :new, :agency
        can :create, :agency
        can :new, :maintenance_request
        can :create, :maintenance_request
      end 
    
  end
end



 