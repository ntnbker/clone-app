class PagesController < ApplicationController
  
  # caches_action :home
  
  def home
    
    session[:customer_input] = nil
    @query = Query.new
    @main_users = MainUser.all
    @service = Service.all
    
    @user_type = params[:user_type] 
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id]) 
    @anchor = params[:anchor] 
    @message = params[:message] 
    @quote_message_id = params[:quote_message_id]
    @appointment_id = params[:appointment_id] 
    @stop_reminder = params[:stop_reminder] 
    @quote_request_id = params[:quote_request_id] 
    #@role = params[:role]
    @email_role = params[:role]
    







    if current_user
      if current_user.current_role.role == "AgencyAdmin" || current_user.current_role.role == "Agent"
        @role = "Agent"
      elsif current_user.current_role.role == "Tenant"
        @role = "Tenant"
      elsif current_user.current_role.role == "Landlord"
        @role = "Tenant"
      elsif current_user.current_role.role == "Trady"
        @role = "Tenant"
      end
    end 


    
  end

  

  def create
    @query = Query.new(query_params)
    @main_users = MainUser.all
    @service = Service.all
    
    if @query.valid?
      @query.save
      session[:customer_input] = @query.id
      if params[:form_fields][:user_role] == "Agent" 
        if logged_in? && current_user.logged_in_as("Agent") || logged_in? && current_user.logged_in_as("AgencyAdmin")
          redirect_to new_maintenance_request_path
        else
          flash[:notice] = "As an Agent please login"
          redirect_to menu_login_path(query_id:@query.id)
        end 

      elsif params[:form_fields][:user_role] == "Tenant"
        redirect_to new_maintenance_request_path
      elsif params[:form_fields][:user_role] == "Landlord"
        redirect_to new_maintenance_request_path
      end 
          
    else
      flash[:danger] = "Please fill all the fields below"
      redirect_to root_path
    end
    
  end


  def general_terms
    
  end

  def privacy_policy
    
  end

  def about
    
  end

  def support
    
  end
  


  
  private

  def query_params
    params.require(:form_fields).permit(:user_role,:tradie, :address)
  end

 

end 
