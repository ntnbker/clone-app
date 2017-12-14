class ActionStatusSweeper < ActionController::Caching::Sweeper
  observe ActionStatus

  def after_update(action_status)
    # expire_action :index
    # expire_action :show, :id => post
    # # this is the same as the previous line
    expire_action :controller => :agency_admin_maintenance_requests, :action => :index
  end
end

# # then in the controller, load the sweeper
# class PostsController < ApplicationController
#   cache_sweeper :action_status_sweeper
# end