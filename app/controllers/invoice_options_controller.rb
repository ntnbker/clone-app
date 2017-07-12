class InvoiceOptionsController < ApplicationController
  # before_action(only: [:show]) { email_auto_login(params[:user_id]) }
  before_action :require_login, only:[:show]
  before_action(only:[:show]) {allow("Trady")}
  
  def show
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @maintenance_request_id = params[:maintenance_request_id]
    @trady_id = params[:trady_id]
    @quote_id = params[:quote_id]
    @trady_company_id = params[:trady_company_id]
  end

  private

  # def email_auto_login(id)
  #   email = email_params= params[:user_id]
  #   if email
  #     user = User.find_by(id:id)
  #     if user
  #       if current_user
  #         if current_user
  #           if current_user.logged_in_as("Tenant") || current_user.logged_in_as("Landlord") || current_user.logged_in_as("AgencyAdmin") || current_user.logged_in_as("Agent")
  #             answer = true
  #           else
  #             answer = false
  #           end 
  #         else
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Trady")
  #         end 

  #         if current_user  && answer && user.has_role("Trady")
  #           logout
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Trady")
  #         elsif current_user == nil
  #           auto_login(user)
  #           user.current_role.update_attribute(:role, "Trady")
  #         elsif current_user && current_user.logged_in_as("Trady")
  #             #do nothing
  #         end 
  #       else
  #         auto_login(user)
  #         user.current_role.update_attribute(:role, "Trady")
  #       end 
  #     else 
  #       flash[:notice] = "You are not allowed to see that. Log in as an authorized user."
  #       redirect_to root_path
  #     end
  #   else
  #    #do nothing
  #    end 
  # end

end 