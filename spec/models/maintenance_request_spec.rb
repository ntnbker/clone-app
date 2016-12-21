require "rails_helper"


describe MaintenanceRequest do 
  describe "#mr_tenants_array" do 
    it"should return an array of array with each user ID" do 
      user1 = Fabricate(:user, id:1)
      role1 = Fabricate(:role, user_id:user1.id)
      tenant = Fabricate(:tenant, id:1, user_id:user1.id)
      tenant.roles << role1
      role1.save
      tenant.save

      user2 = Fabricate(:user, id:2)
      role2 = Fabricate(:role, user_id:user2.id)
      tenant2 = Fabricate(:tenant, id:2, user_id:user2.id)
      tenant2.roles << role2
      role2.save
      tenant2.save



      mr = Fabricate(:maintenance_request, id:1)

      tmr = TenantMaintenanceRequest.create(tenant_id:tenant.id, maintenance_request_id:mr.id)
      tmr2 = TenantMaintenanceRequest.create(tenant_id:tenant2.id, maintenance_request_id:mr.id)



       
      expect(mr.mr_tenants_array).to eq([["Tenant", 1], ["Tenant", 2]])

    end 

  end 
  
end