require "rails_helper"

describe PagesController do 
  describe "GET home" do 
    it "sets up @main_users instance variables" do 
      all_main_users = MainUser.all 
      get :home
      expect(assigns(:main_users)).to eq(all_main_users)
    end 
    it "sets up @service instance variables" do 
      all_services = Service.all
      get :home
      expect(assigns(:service)).to eq(all_services)
    end
    
    it "renders the home page" do
      get :home
      expect(response).to render_template :home
    end 
  end 

  describe "POST route_user_type" do 
    it "redirects to agent sign up page if params hash contains agent" do 
      post :route_user_type, form_fields:{main_user:"Agent", service:"Plumber"}
      expect(response).to redirect_to agency_admin_sign_up_path
    end 
    it "creates a session that stores the relavant information from the params" do
      post :route_user_type, form_fields:{main_user:"Agent", service:"Plumber"}
      expect(session[:customer_input]).to eq({"main_user"=>"Agent", "service"=>"Plumber"})
    end
  end 
end 