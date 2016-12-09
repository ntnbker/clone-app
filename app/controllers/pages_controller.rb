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
        if logged_in?
          redirect_to new_maintenance_request_path
        else
          redirect_to login_path
        end 
      #if logged in  redirect_to create maintenance form else redirect to login path
      end 

    else
      flash[:notice] = "Please pick the fields below"
      render :home
      
    end
    


    
  end
  

  def query_params
    params.require(:form_fields).permit(:user_role,:tradie, :address)
  end

end 
