require "rails_helper"

describe AgencyAdminsController do 
  describe "GET new" do 
    it "renders the new Agency Admin template" do 
      get :new
      expect(response).to render_template :new
    end 
    it "sets the agency admin instance variable" 

  end 

end 