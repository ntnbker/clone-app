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
        role = Fabricate(:role, user_id:user.id)
        god = Fabricate(:god)
        god.roles << role
        role.save
        god.save
        post :create, email: user.email, password:"password"
        expect(assigns(:user)).to eq(user)
      end 
      context "For God User Role" do 
        it "sets the flash message you are now signed in" do 
          user = Fabricate(:user, id:1)
          role = Fabricate(:role, user_id:user.id)
          god = Fabricate(:god)
          god.roles << role
          role.save
          god.save
          post :create, email: user.email, password:"password"
          expect(flash[:notice]).to eq("You are now signed in")
        end 
        
        it "redirects to the God Profile page if the user's role is God" do 
          user = Fabricate(:user, id:1)
          role = Fabricate(:role, user_id:user.id)
          god = Fabricate(:god)
          god.roles << role
          role.save
          god.save
          post :create, email: user.email, password:"password"
          
          expect(response).to redirect_to god_path(god)
        end 
      end 

      context "For Agent User Role" do 
        it "sets the flash message you are now signed in" do 
          user = Fabricate(:user, id:1)
          role = Fabricate(:role, user_id:user.id)
          agent = Fabricate(:agent)
          agent.roles << role
          role.save
          agent.save
          post :create, email: user.email, password:"password"
          expect(flash[:notice]).to eq("You are now signed in")
        end 
        
        it "redirects to the Agent Profile page if the user's role is Agent" do 
          user = Fabricate(:user, id:1)
          role = Fabricate(:role, user_id:user.id)
          agent = Fabricate(:agent)
          agent.roles << role
          role.save
          agent.save
          post :create, email: user.email, password:"password"
          
          expect(response).to redirect_to agent_path(agent)
        end 
      end 

    end
  
  end 


end 