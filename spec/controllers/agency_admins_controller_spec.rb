require "rails_helper"

describe AgencyAdminsController do 
  describe "GET new" do 
    it "renders the new Agency Admin template" do 
      get :new
      expect(response).to render_template :new
    end 
    it "sets the user instance variable" do 
      get :new
      expect(assigns(:user)).to be_an_instance_of(User)
    end  
    it "assigns instance variable to the contents of the customer session" do 
      session[:customer_input]= {"main_user"=>"Agent", "service"=>"Plumber"}
      get :new
      expect(assigns(:customer_input)).to eq({"main_user"=>"Agent", "service"=>"Plumber"})
    end 



  end 

end 