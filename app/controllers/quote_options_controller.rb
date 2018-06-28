class QuoteOptionsController < ApplicationController
  # before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action :require_login, only:[:show]
  before_action :require_role
  before_action(only:[:show,:index]) {allow("Trady")}
  def show
    @maintenance_request= MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @trady = Trady.find_by(id:params[:trady_id])
    @trady_id = @trady.id
  end


  private

  # def email_auto_login(id)

  #   user = User.find_by(id:id)
  #   if user
  #     if current_user
  #       if current_user
  #         if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("AgencyAdmin") || current_user.logged_in_as("Agent")
  #           answer = true
  #         else
  #           answer = false
  #         end 
  #       else
  #         auto_login(user)
  #         user.current_role.update_attribute(:role, "Trady")
  #       end 

  #       if current_user  && answer && user.has_role("Trady")
  #         logout
  #         auto_login(user)
  #         user.current_role.update_attribute(:role, "Trady")
  #       elsif current_user == nil
  #         auto_login(user)
  #         user.current_role.update_attribute(:role, "Trady")
  #       elsif current_user && current_user.logged_in_as("Trady")
  #           #do nothing
  #       end 
  #     else
  #       auto_login(user)
  #       user.current_role.update_attribute(:role, "Trady")
  #     end 
  #   else 
  #     flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
  #     redirect_to root_path
  #   end 

  # end 
end 