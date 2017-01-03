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

      
      if @user.god?
        can :manage, :all
        can :read_show, Agent
        
        can :read, Service
        
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :read_show, MaintenanceRequest
      end

      if @user.agent?
        can :read_show, Agent
        
        can :read, Service
        
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :read_show, MaintenanceRequest
        
      end

      if @user.agency_admin?
        can :read_show, Agent
        
        can :read, Service
        
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :read_show, MaintenanceRequest

        can :show, :maintenance_request
        can :index, :maintenance_request
        # can :new, AgencyAdmin
        # can :read_show, AgencyAdmin

        


        #can [:new, :create, :show], :agent_maintenance_requests
        can :show, :agency_admin
        can :new, :agency_admin
        can :maintenance_request_index, :agency_admin 
      end

      if @user.tenant?
        
        can :read_index, Tenant
        can :read_show, Tenant
        can :read_show, MaintenanceRequest
        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :index, :maintenance_request
        can :show, :maintenance_request
      end 

      if @user
        

        can :create, MaintenanceRequest
        can :new, MaintenanceRequest
        can :new, AgencyAdmin
        can :create, AgencyAdmin
        can [:new,:create], :agency_admins

        can :new, :maintenance_request
      end 
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end



 # def initialize(user)
 #    # Guest User 
 #    unless user 
 #      can :read, [Asana,Image,User,Video,Sequence]
 #    else
 #      # All registered users
 #      can {registered user-y permissions}
 #      # Admins 
 #      if user.is_admin?
 #        can :manage, :all
 #      end
 #    end 
 #  end 