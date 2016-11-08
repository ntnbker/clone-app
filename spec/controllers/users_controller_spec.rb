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
    
  end 

end 