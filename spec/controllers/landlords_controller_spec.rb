require "rails_helper"

describe LandlordsController do 
  describe "GET New" do 
    it "should render new register template" do 
      get :new
      expect(response).to render_template :new

    end 
    it "should set the @landlord instance variable"

  end 


end 