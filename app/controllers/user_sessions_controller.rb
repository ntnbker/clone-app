class UserSessionsController < ApplicationController
  #before_action :is_signed_in, only:[:new]
  before_action :is_logged_out, only:[:destroy]
  def new
    @query = params[:query_id]
    @user_type = params[:user_type]
    @maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    @anchor = params[:anchor]
    @message = params[:message]
    @quote_message_id = params[:quote_message_id]
    @appointment_id = params[:appointment_id]
    if current_user
      flash[:danger] = "You are already logged in"
      redirect_to root_path
    end 
  end

  def create
    
    @role = params[:role_picked]
    @user = login(params[:email].gsub(/\s+/, "").downcase, params[:password].gsub(/\s+/, ""))
    @query = Query.find_by(id:params[:query_id])
    email_user_type = params[:user_type]
    maintenance_request = MaintenanceRequest.find_by(id:params[:maintenance_request_id])
    
    if @user && @role && @user.has_role(params[:role_picked])
      
      @user.current_role.update_attribute(:role, params[:role_picked])
      
        if @user.logged_in_as("God")
          flash[:success] = "You are now signed in"
          redirect_to god_path(@user.role)
          
          elsif @user.logged_in_as("Agent")
            flash[:success] = "You are now signed in"
            if @query
              redirect_to new_maintenance_request_path
            else
              
              if maintenance_request
                redirect_to agent_maintenance_request_path(maintenance_request, anchor: params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id]) 
              else
                redirect_to agent_maintenance_requests_path(email:@user.email)
              end 
            end
          elsif @user.logged_in_as("AgencyAdmin")
            flash[:success] = "You are now signed in"
            if @query
              redirect_to new_maintenance_request_path
            else
              if maintenance_request
                redirect_to agency_admin_maintenance_request_path(maintenance_request, anchor: params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id]) 
              else 
                redirect_to agency_admin_maintenance_requests_path(email:@user.email)
              end 
            end 
          elsif @user.logged_in_as("Tenant")
            flash[:success] = "You are now signed in"
            if maintenance_request
              redirect_to tenant_maintenance_request_path(maintenance_request, message:params[:message], appointment_id:params[:appointment_id]) 
            else 
              redirect_to tenant_maintenance_requests_path(email:@user.email)
            end 
          elsif @user.logged_in_as("Landlord")
            flash[:success] = "You are now signed in"
            
            if maintenance_request
              redirect_to landlord_maintenance_request_path(maintenance_request,anchor: params[:anchor], message:params[:message], appointment_id:params[:appointment_id])
              
            else
              redirect_to landlord_maintenance_requests_path(email:@user.email)
            end 
          elsif @user.logged_in_as("Trady")
            flash[:success] = "You are now signed in"
            if maintenance_request
              redirect_to trady_maintenance_request_path(maintenance_request, anchor: params[:anchor], message:params[:message], quote_message_id:params[:quote_message_id], appointment_id:params[:appointment_id]) 
            else
              redirect_to trady_maintenance_requests_path(email:@user.email)
            end 
          else
            flash[:danger] = "Something Went Wrong"
            render :menu_bar_login_form_new
            
        end 
    else
      if current_user
        current_user.current_role.update_attribute(:role,nil)
      end 
      logout
      flash[:danger] = "Please use your correct email, password and role you have access to."
      redirect_to menu_login_path
      
    end 
  end


  





  def destroy
    current_user.current_role.update_attribute(:role,nil)
    
    logout
    
    redirect_to root_path
    flash[:message] = "You Have Now Logged Out"
  end

  

  private

  def is_signed_in
    
    if current_user
      flash[:notice] = "You are already logged in"
      redirect_to root_path
    end 
  end

  def is_logged_out
    
    if current_user == nil 

      logout    
      flash[:notice] = "You are already logged out"
      redirect_to root_path
    end 

  end

  def user_params
    # params.permit(:email) WE HAVE TO MAKE SURE WE GOT PARAMS INPLACE
  end


end 

# if the user has this type of role and they logged in