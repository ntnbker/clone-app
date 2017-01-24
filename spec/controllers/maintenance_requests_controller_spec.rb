require "rails_helper"

describe MaintenanceRequestsController do 
  describe "GET new" do 
    
    it "sets the maintance request instance variable" do 
      user1 = Fabricate(:user, id:1)
      role1 = Fabricate(:role, user_id:user1.id)
      agent = Fabricate(:agent, id:1)
      agent.roles << role1
      role1.save
      agent.save
      login_user(user1)
      
      get :new
      expect(assigns(:maintenance_request)).to be_an_instance_of(MaintenanceRequest)
    end 
    it "renders the new template" do 
      user1 = Fabricate(:user, id:1)
      role1 = Fabricate(:role, user_id:user1.id)
      agent = Fabricate(:agent, id:1)
      agent.roles << role1
      role1.save
      agent.save
      login_user(user1)
      get :new
      expect(response).to render_template :new
    end 

  end 


  describe "POST create" do 
    context "with valid input" do
      
      # it "expects redirect when not signed in" do 
      #   user1 = Fabricate(:user, id:1)
      #   role1 = Fabricate(:role, user_id:user1.id)
      #   agent = Fabricate(:agent, id:1)
      #   agent.roles << role1
      #   role1.save
      #   agent.save
      #   query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
      #   session[:customer_input] = query.id
        
      #   post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
      #   expect(response).to redirect_to login_path
      # end    
      
      it "sets the maintenace instance variable" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        expect(assigns(:maintenance_request)).to be_an_instance_of(MaintenanceRequest)
      end

      it "sets the customer_input instance variable to the instance of the query found by its id" do
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber",id:1)
        session[:customer_input] = query.id

        post :create, maintenance_request:{name:"Martin", 
                                           email:"email@email.com", 
                                           mobile:"1234567890",
                                           person_in_charge:"Agent", 
                                           real_estate_office:"123 Leaders", 
                                           agent_email:"leon@email.com", 
                                           agent_name:"Leon Chan", 
                                           agent_mobile:"12345678", 
                                           image:"tests",
                                           maintenance_heading:"Broken tap", 
                                           maintenance_description:"The tap is leaking ",
                                           access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, 
                                           availabilities_attributes:{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        expect(assigns(:customer_input)).to eq(query)
      end 
      
      it "saves a maintenance request in the db" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{name:"Martin", 
                                           email:"email@email.com", 
                                           mobile:"1234567890",
                                           person_in_charge:"Agent", 
                                           real_estate_office:"123 Leaders", 
                                           agent_email:"leon@email.com", 
                                           agent_name:"Leon Chan", 
                                           agent_mobile:"12345678", 
                                           image:"tests",
                                           maintenance_heading:"Broken tap", 
                                           maintenance_description:"The tap is leaking ",
                                           access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, 
                                           availabilities_attributes:{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        expect(MaintenanceRequest.count).to eq(1)
      end

      it "creates a user in the db if they dont exists already" do 

        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{name:"Martin", 
                                           email:"email@email.com", 
                                           mobile:"1234567890",
                                           person_in_charge:"Agent", 
                                           real_estate_office:"123 Leaders", 
                                           agent_email:"leon@email.com", 
                                           agent_name:"Leon Chan", 
                                           agent_mobile:"12345678", 
                                           image:"tests",
                                           maintenance_heading:"Broken tap", 
                                           maintenance_description:"The tap is leaking ",
                                           access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, 
                                           availabilities_attributes:{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        expect(User.count).to eq(1)
      end 

      it "creates a tenant in the db sets the user id" do 
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{name:"Martin", 
                                           email:"email@email.com", 
                                           mobile:"1234567890",
                                           person_in_charge:"Agent", 
                                           real_estate_office:"123 Leaders", 
                                           agent_email:"leon@email.com", 
                                           agent_name:"Leon Chan", 
                                           agent_mobile:"12345678", 
                                           image:"tests",
                                           maintenance_heading:"Broken tap", 
                                           maintenance_description:"The tap is leaking ",
                                           access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, 
                                           availabilities_attributes:{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        expect(Tenant.count).to eq(1)
      end 
      
      # it "sets the id of the agent" do 
      #   user1 = Fabricate(:user, id:1)
      #   role1 = Fabricate(:role, user_id:user1.id)
      #   agent = Fabricate(:agent, id:1)
      #   agent.roles << role1
      #   role1.save
      #   agent.save
      #   login_user(user1)
      #   query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
      #   session[:customer_input] = query.id

      #   post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
      #   expect(MaintenanceRequest.first.agent_id).to eq(1)
      # end   
      
      it 'sets the flash message to success' do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        expect(flash[:notice]).to eq("Thank You")
      end 
      
      it "saves an access contact to the database" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        expect(AccessContact.count).to eq(2)
      end 
      
      it "saves an availability to the db" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id

        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        expect(Availability.count).to eq(1)
      end 
      
      it "sets up an association to between the maintenance request and access contact" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id
        
        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        request = MaintenanceRequest.first.access_contacts.first
        access_contact = AccessContact.first
        expect(access_contact).to eq(request)
      end 
      
      it "sets up an association between the maintenance request and availability" do
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id
        
        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        request_availability = MaintenanceRequest.first.availabilities.first
        availability = Availability.first
        expect(availability).to eq(request_availability)
      end 

      it "sets up an association between the maintenance request and query" do 
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id
        
        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        maintenance_request = MaintenanceRequest.first.id
        query.reload
        expect(query.maintenance_request_id).to eq(maintenance_request)
      end 
      
      it "should redirect to the maintenance request show page" do
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)
        query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
        session[:customer_input] = query.id
        post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
        
        expect(response).to redirect_to maintenance_request_path(MaintenanceRequest.first)
      end 
      
      context "sends email" do 
        after {ActionMailer::Base.deliveries.clear}
        it "should send an email to the main contact on the form" do 
          user1 = Fabricate(:user, id:1)
          role1 = Fabricate(:role, user_id:user1.id)
          agent = Fabricate(:agent, id:1)
          agent.roles << role1
          role1.save
          agent.save
          login_user(user1)
          query = Fabricate(:query,user_role:"Agent", tradie:"Plumber")
          session[:customer_input] = query.id

          post :create, maintenance_request:{person_in_charge:"Agent" ,real_estate_office:"123 Leaders", agent_email:"leon@email.com", agent_name:"Leon Chan", agent_mobile:"12345678",name:"Martin", email:"email@email.com", mobile:"1234567890", image:"tests",access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, maintenance_heading:"Broken tap", maintenance_description:"The tap is leaking ", "availabilities_attributes"=>{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}}}
          
          expect(ActionMailer::Base.deliveries).not_to be_empty

        end 
        it "should send an email to anyone that is labeled as tenant within the form"
      end 

      

    end

    context "with invalid input" do 

    end 
  end 

  describe "GET show" do 
    it "assigns the instance variable to the maintenace_request_id picked" do
      user1 = Fabricate(:user, id:1)
      role1 = Fabricate(:role, user_id:user1.id)
      agent = Fabricate(:agent, id:1)
      agent.roles << role1
      role1.save
      agent.save
      login_user(user1) 
      m = MaintenanceRequest.create(name:"Martin", 
                                           email:"email@email.com", 
                                           mobile:"1234567890",
                                           person_in_charge:"Agent", 
                                           real_estate_office:"123 Leaders", 
                                           agent_email:"leon@email.com", 
                                           agent_name:"Leon Chan", 
                                           agent_mobile:"12345678", 
                                           image:"tests",
                                           maintenance_heading:"Broken tap", 
                                           maintenance_description:"The tap is leaking ",
                                           access_contacts_attributes:{"1481078351273"=>{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, "0"=>{relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}}, 
                                           availabilities_attributes:{"0"=>{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}})
        
      
      get :show, id:m.id
      expect(assigns(:maintenance_request)).to eq(m)
    end 
    it "renders the show template" do 
      user1 = Fabricate(:user, id:1)
      role1 = Fabricate(:role, user_id:user1.id)
      agent = Fabricate(:agent, id:1)
      agent.roles << role1
      role1.save
      agent.save
      login_user(user1)
      m = MaintenanceRequest.create(name:"Martin", 
                                           email:"email@email.com", 
                                           mobile:"1234567890",
                                           person_in_charge:"Agent", 
                                           real_estate_office:"123 Leaders", 
                                           agent_email:"leon@email.com", 
                                           agent_name:"Leon Chan", 
                                           agent_mobile:"12345678", 
                                           image:"tests",
                                           maintenance_heading:"Broken tap", 
                                           maintenance_description:"The tap is leaking ",
                                           access_contacts_attributes:[{relation:"Husband", name:"emily", email:"emaily@email.com", mobile:"5555555555", _destroy:"false"}, {relation:"Husband", name:"john", email:"john@email.com", mobile:"0987654321", _destroy:"false"}], 
                                           availabilities_attributes:[{date:"Tuesday, December 6th 2016", start_time:"9:00 AM", finish_time:"10:00 AM"}])
        
      
      get :show, id:m.id
      expect(response).to render_template :show
    end 
  end 

end 