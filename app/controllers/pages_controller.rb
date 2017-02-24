class PagesController < ApplicationController
  
  
  def home
    session[:customer_input] = nil
    @query = Query.new
    @main_users = MainUser.all
    @service = Service.all
  end

  

  def create
    @query = Query.new(query_params)
    @main_users = MainUser.all
    @service = Service.all
    
    if @query.valid?
      @query.save
      session[:customer_input] = @query.id
      if params[:form_fields][:user_role] == "Agent" 
        if logged_in? && current_user.agent? || logged_in? && current_user.agency_admin?
          redirect_to new_maintenance_request_path
        else
          redirect_to login_path
        end 

      elsif params[:form_fields][:user_role] == "Tenant"
        redirect_to new_maintenance_request_path
      elsif params[:form_fields][:user_role] == "Landlord"
        redirect_to new_maintenance_request_path
      end 
          
    else
      flash[:danger] = "Please fill all the fields below"
      render :home
    end
    
  end
  
  private

  def query_params
    params.require(:form_fields).permit(:user_role,:tradie, :address)
  end

 

end 
