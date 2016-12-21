require "rails_helper"


describe MessagesController do 
  describe "POST create" do 
    context "Signed in" do
      before(:each) do
        user1 = Fabricate(:user, id:1)
        role1 = Fabricate(:role, user_id:user1.id)
        agent = Fabricate(:agent, id:1)
        agent.roles << role1
        role1.save
        agent.save
        login_user(user1)

      end
      
      it "sets the message instance variable" do 
        post :create, message:{"message_to"=>"Tenant", "body"=>"sdfasdfdsfsdfdsf"}
        expect(assigns(:message)).to be_an_instance_of(Message)
      end 
      it "creates a message in the database" do 
        
      end 
      it "creates an association between user(sender) and user_messages"
      it "creates an association between user(reciever) and user_messages"

    end 

    context "Not Signed in"

  end 


end 