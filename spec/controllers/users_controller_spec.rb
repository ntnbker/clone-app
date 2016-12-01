require "rails_helper"

describe UsersController do 
  describe"GET new" do 
    it "assigns an instance variable to an instance of a user model" do 
      get :new
      expect(assigns(:user)).to be_an_instance_of(User)
    end 
    it "renders the new template" do 
      get :new
      expect(response).to render_template :new
    end 
  end 

  describe "POST create" do 
    it "should the correctly whitelist attributes on with strong params"
    context "with valid input" do 
      it "sets an instance variable with in instance of user" do 
      post :create, user:{email:"ron@email.com", password:"12345"}
      expect(assigns(:user)).to be_an_instance_of(User)
    end 
    it "creates a user in the database" do 
      post :create , user:{email:"ron@email.com", password:"12345"}
      expect(User.count).to eq(1)
    end 

    it "redirects to sign in page" do 
      post :create, user:{email:"ron@email.com", password:"12345"}
      expect(response).to redirect_to login_path
    end 
    it "sets up the flash notice saying thank you for joining" do 
      post :create, user:{email:"ron@email.com",password:"12345"}
      expect(flash[:notice]).to eq("Thank you for signing up.")
    end 
    end 
    context "without valid input" do
      it "renders the new user template" do 
        post :create , user:{email:"ron@email.com"}
        expect(response).to render_template :new
      end  
      it "sets the instance variable so we can see errors" do 
        post :create, user:{email:"ron@email.com"}
        expect(assigns(:user)).to be_an_instance_of(User)
      end 
      it "doesnt create a user in the database" do 
        post :create , user:{email:"ron@email.com"}
        expect(User.count).to eq(0)
      end 
      
      it "sets up a flash notice saying something went wrong" do 
        post :create , user:{email:"ron@email.com"}
        expect(flash[:notice]).to eq("Sorry something went wrong")
      end

    end 
  end 

end 