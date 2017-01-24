require "rails_helper"

describe AgencyAdminsController do 
  # describe "GET new" do 
  #   it "renders the new Agency Admin template" do 
  #     get :new
  #     expect(response).to render_template :new
  #   end 
  #   it "sets the user instance variable" do 
  #     get :new
  #     expect(assigns(:user)).to be_an_instance_of(User)
  #   end  
    
  # end 

  # describe "POST create" do 
  #   context "with valid input" do  
  #     it "creates a user in the database" do
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
        
  #       expect(User.count).to eq(1)
  #     end 
  #     it "associates the user with the agent" do 
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
  #       agency = AgencyAdmin.first
  #       expect(User.first.agency_admin).to eq(agency)
  #     end 
  #     it "creates an agency in the database" do
        
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
        
  #       expect(AgencyAdmin.count).to eq(1)
      
  #     end 
  #     it "sets the role for the user as an agent" do 
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
  #       agency = AgencyAdmin.first
  #       user= User.first
  #       expect(user.role.roleable_type).to eq("AgencyAdmin")
  #     end 

  #     it "sets the flash notice" do 
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
        
  #       expect(flash[:notice]).to eq("Thank you for signing up.")
  #     end 
  #     it "logs them in testing for this we can use current user method" do 
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
  #       user = User.first
  #       login_user(user) 
  #       expect(assigns(:logged_user)).to eq(user)

  #     end 

  #     it "should redirect to the agency admin home page" do 
  #       post :create, user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
  #       agency = AgencyAdmin.first
  #       expect(response).to redirect_to agency_admin_path(agency)

  #     end 
      
  #     # it "should the correctly whitelist attributes on with strong params" do
  #     #   params = {user:{agency_admin_attributes:{company_name:"Leaders", business_name:"Leaders International", abn:"1234567", address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}}
        
  #     #   should permit(:user).for(:create,params: params) 
  #     # end 
  #   end 

  #   context "with invalid inputs" do 
  #     it "does not create a user in the database" do 
  #       post :create, user:{agency_admin_attributes:{address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
        
  #       expect(User.count).to eq(0)
  #     end 
  #     it "does not create a AgencyAdmin in the database" do 
  #       post :create, user:{agency_admin_attributes:{address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
        
  #       expect(AgencyAdmin.count).to eq(0)
  #     end 
  #     it "it does not set the role for the user" do 
  #       post :create, user:{agency_admin_attributes:{address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
       
  #       expect(Role.count).to eq(0)
  #     end 
  #     it "renders the new template" do 
  #       post :create, user:{agency_admin_attributes:{address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
  #       expect(response).to render_template :new
  #     end 
  #     it "sets the flash message" do 
  #       post :create, user:{agency_admin_attributes:{address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
  #       expect(flash[:notice]).to eq("Sorry something went wrong")
  #     end  
  #     it "sets the instance variable to an instance of User" do 
  #       post :create, user:{agency_admin_attributes:{address:"238 Victoria Road", mailing_address:"238 Victoria Road", phone:"04 12345678", mobile_phone:"04 12345678", license_type:"Individual License", license_number:"123456789", corporation_license_number:"", bdm_verification_status:"0", first_name:"Leon", last_name:"Chan"},email:"leon@email.com", password:"12345"}
        
  #       expect(assigns(:user)).to be_an_instance_of(User)
  #     end 

  #   end 
  # end

  # describe "GET show" do 
  #   it "sets the @agency_admin to the person who has signed in" do 
  #     # We can use scorcery loged_user set it to a variable 
  #     # and then compare that to instance variable inside the controller
  #   end 
  # end 

end 