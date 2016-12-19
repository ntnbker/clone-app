class CreateTenantMaintenanceRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :tenant_maintenance_requests do |t|
      t.integer :tenant_id
      t.integer :maintenance_request_id
      t.timestamps
    end
  end
end
