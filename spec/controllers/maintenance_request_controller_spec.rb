require "rails_helper"

describe MaintenanceRequestController do 
  describe "GET new" do 
    it "requires a user to be logged in?"
    it "sets the maintance request instance variable" do 
      get :new
      expect(assigns(:maintance_request)).to be_an_instance_of(MaintenanceRequest)
    end 
    it "renders the new template"

  end 

end 