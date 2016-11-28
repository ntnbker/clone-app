require 'rails_helper'

# RSpec.describe User, type: :model do
#   pending "add some examples to (or delete) #{__FILE__}"
# end


require "rails_helper"

describe User do 
  describe "#god?" do 
    it "returns true if the role is equal to God" do 
      user = Fabricate(:user) 
      role = Fabricate(:role, user_id:user.id)
      god = Fabricate(:god)
      god.roles << role
      role.save
      god.save

      expect(user.god?).to eq(true)

    end 

  end 

  describe "#agent?" do 
    it "returns true if the role is equal to God" do 
      user = Fabricate(:user) 
      role = Fabricate(:role, user_id:user.id)
      agent = Fabricate(:agent)
      agent.roles << role
      role.save
      agent.save

      expect(user.agent?).to eq(true)

    end 

  end 

end 