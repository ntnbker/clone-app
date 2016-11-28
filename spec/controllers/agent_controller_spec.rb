require "rails_helper"

describe AgentsController do 
  describe "GET show" do 
    it "sets the instance variable to the agent signed in" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent)
        agent.roles << role1
        role1.save
        agent.save

        login_user(user1) 
        get :show, {id:user1.id}
        expect(assigns(:agent)).to eq(agent)

    end 
    it "renders the show template" 

    context "Does NOT have Agent Role" do 
      # it "redirects if Role not Agent" do 
      #   user1 = Fabricate(:user, id:1)
      #   role1 = Fabricate(:role, user_id:user1.id)
      #   agent = Fabricate(:agent)
      #   agent.roles << role1
      #   role1.save
      #   agent.save


      #   user2 = Fabricate(:user, id:2)
      #   role2 = Fabricate(:role, user_id:user2.id)
      #   god = Fabricate(:god)
      #   god.roles << role2
      #   role2.save
      #   god.save

      #   login_user(user1) 

      #   get :show, {id:god.id}
      #   expect(response).to redirect_to login_path
      # end 
    end

  end 
end 