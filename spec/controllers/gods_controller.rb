require "rails_helper"

describe GodsController do 
  describe "GET show" do 
    context "Has God Role" do 
      
      it "sets the instance variable to the God Role" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent)
        agent.roles << role1
        role1.save
        agent.save


        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save

        login_user(user2)
        
        get :show, {id:god.id}
        expect(assigns(:god)).to eq(god)
      end 
      
      it "renders the show page " do
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent)
        agent.roles << role1
        role1.save
        agent.save


        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save

        login_user(user2) 

        get :show, {id:god.id}
        expect(response).to render_template :show
      end 
    end 

    context "Does NOT have God Role" do 
      it "redirects if Role not God" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent)
        agent.roles << role1
        role1.save
        agent.save


        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save

        login_user(user1) 

        get :show, {id:god.id}
        expect(response).to redirect_to login_path
      end 
    end 

    context "is not signed in" do 
      it "redirects to sign in page when user not logged in" do 
        

        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        binding.pry
        get :show, {id:god.id}

        expect(response).to redirect_to login_path
      end 

    end 
  end 
end 
