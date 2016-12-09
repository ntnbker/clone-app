require "rails_helper"

describe PagesController do 
  describe "GET home" do 
    it "sets up @query instance variables" do 
      all_main_users = MainUser.all 
      get :home
      expect(assigns(:query)).to be_an_instance_of(Query)
    end 
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
    context "not logged in" do   
      it "redirects to login page if params hash contains agent" do 
        post :create, form_fields:{user_role:"Agent", tradie:"Plumber", address:"123 street avenue"}
        expect(response).to redirect_to login_path
      end 
      it "creates a session that stores the relavant information from the params" do
        post :create, form_fields:{user_role:"Agent", tradie:"Plumber", address:"123 street avenue"}
        query = Query.first.id
        expect(session[:customer_input]).to eq(query)
      end
      it "creates a query in the database" do 
        post :create, form_fields:{user_role:"Agent", tradie:"Plumber", address:"123 street avenue"}

        expect(Query.count).to eq(1)
      end 
      it "should the correctly whitelist attributes with strong params"
    end 

    context "logged in" do 
      it"redirects them to the maintenance request form" 
    end 
  end 
end 

