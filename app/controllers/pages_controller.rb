class PagesController < ApplicationController
  def home
    session[:customer_input] = nil
    @query = Query.new
    @main_users = MainUser.all
    @service = Service.all
  end

  

  def create
    @query = Query.new(query_params)
    session[:customer_input] = params[:form_fields]
    
    if @query.valid?
      @query.save
      session[:customer_input] = @query.id
      if params[:form_fields][:user_role] == "Agent"
      redirect_to login_path
      #if logged in as agent or agency_admin redirect_create maintenance form else redirect to login path
      end 

    else
      render :home
      flash[:notice] = "Please pick the fields below"
    end
    


    
  end
  

  def query_params
    params.require(:form_fields).permit(:user_role,:tradie, :address)
  end

end 
