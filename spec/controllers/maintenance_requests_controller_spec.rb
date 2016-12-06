require "rails_helper"

describe MaintenanceRequestsController do 
  describe "GET new" do 
    it "requires a user to be logged in?"
    it "sets the maintance request instance variable" do 
      get :new
      expect(assigns(:maintenance_request)).to be_an_instance_of(MaintenanceRequest)
    end 
    it "renders the new template" do 
      get :new
      expect(response).to render_template :new
    end 

  end 

end 