class AgencyAdminsController < ApplicationController

  def new

    @customer_input = session[:customer_input]

    @user = User.new

    @user.build_agency_admin

   
  
  end


end 