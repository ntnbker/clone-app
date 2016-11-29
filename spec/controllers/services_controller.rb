require "rails_helper"

describe ServicesController do 
  describe "GET new" do 
    context "with signed in God User" do 

      it "assigns service instance variable" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        login_user(user2)
        get :new, {god_id:god.id}
        
        expect(assigns(:service)).to be_an_instance_of(Service)
      
      end 
      it "assigns god instance variable" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        login_user(user2)
        get :new, {god_id:god.id}
        
        expect(assigns(:god)).to be_an_instance_of(God)
      end 
      it "renders the new service template" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        login_user(user2)
        get :new, {god_id:god.id}
        
        expect(response).to render_template :new
      end 
    end 
    context "with out signed in God User" do 
      it "should redirect to login page"do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        
        get :new, {god_id:god.id}
        
        expect(response).to redirect_to login_path
      end 
      it "should not assign instance variable to an instance of service" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        
        get :new, {god_id:god.id}
        
        expect(assigns(:service)).to eq(nil)
      end 
      it "should not assign instance variable to an instance of god" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        
        get :new, {god_id:god.id}
        
        expect(assigns(:god)).to eq(nil)
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

        get :new, {god_id:god.id}
        expect(response).to redirect_to login_path
      end 
    end 
  end 

  describe "POST create" do 
    context "signed in God User"do 
      it "should assign an instance variable with instance of service" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        login_user(user2)
        post :create , god_id:god.id, service:{service:"Plumber"}
        
        expect(assigns(:service)).to be_an_instance_of(Service)
      end 

      it "should assign an instance variable with instance of God" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        login_user(user2)
         post :create , god_id:god.id, service:{service:"Plumber"}
        
        expect(assigns(:god)).to be_an_instance_of(God)
      end 

      it "should the correctly white attributes on with strong params" do
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save

        login_user(user2) 
        
        params = {god_id:1,service: {service: 'Plumber'}}
        
        should permit(:service).for(:create,params: params) 
      
      end 

      context "with valid inputs"do 

        it "should create a service record in the database" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 

          post :create , god_id:god.id, service:{service:"Plumber"}
          expect(Service.count).to eq(1)
        end 
        it "should create an association between god and service" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 
          
          post :create , god_id:god.id, service:{service:"Plumber"}
          expect(god.services.first).to eq(Service.first)
        end 
        it "should redirect back to the gods profile page god_path" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 
          
          post :create , god_id:god.id, service:{service:"Plumber"}
          expect(response).to redirect_to god_path(god.id)
        end 
        it "sets the flash message when created" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 
          
          post :create , god_id:god.id, service:{service:"Plumber"}
          expect(flash[:notice]).to eq("You have added a new Service")
        end 
      end 
      
      context "with out valid inputs" do 
        
        it "should render the new template" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 
          
          post :create , god_id:god.id, service:{service:""}
          expect(response).to render_template :new
        end 
        
        it "should not save to the database" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 
          
          post :create , god_id:god.id, service:{service:""}
          expect(Service.count).to eq(0)
        end

        it "should set the flash message" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save

          login_user(user2) 
          
          post :create , god_id:god.id, service:{service:""}
          expect(flash[:notice]).to eq("Oops something went wrong!")
        end 

        it "should set instance variable with instance of Service" do 
          user2 = Fabricate(:user, id:2)
          role2 = Fabricate(:role, user_id:user2.id)
          god = Fabricate(:god)
          god.roles << role2
          role2.save
          god.save
          
          login_user(user2)
           post :create , god_id:god.id, service:{service:""}
          
          expect(assigns(:service)).to be_an_instance_of(Service)
        end 
        it "should assign an instance variable with instance of God" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        login_user(user2)
         post :create , god_id:god.id, service:{service:""}
        
        expect(assigns(:god)).to be_an_instance_of(God)
      end 
      end 
    end
   
    context "not signed in User" do 
      it "should redirect to login page" do 
        user2 = Fabricate(:user, id:2)
        role2 = Fabricate(:role, user_id:user2.id)
        god = Fabricate(:god)
        god.roles << role2
        role2.save
        god.save
        
        
        post :create , god_id:god.id, service:{service:"Plumber"}
        
        expect(response).to redirect_to login_path

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

        post :create , god_id:god.id, service:{service:"Plumber"}
        expect(response).to redirect_to login_path
      end 
    end 

  end 






















end 