require "rails_helper" 


describe UserSessionsController do 
  describe "GET new" do 

    it "renders the login page" do 
      get :new
      expect(response).to render_template :new
    end 
  end 

  describe "POST create" do 
    context "valid inputs" do 
      it "assings the instance variable to the right user if authentication passed" do 
        user = Fabricate(:user, id:1)
        post :create, email: user.email, password:"password"
        expect(assigns(:user)).to eq(user)
      end 

       
      it "sets the flash message you are now signed in" do 
        user = Fabricate(:user, id:1)
        post :create, email: user.email, password:"password"
        expect(flash[:notice]).to eq("You are now signed in")
      end 
      it "redirects to the profile page" 
    end
  
  end 


end 