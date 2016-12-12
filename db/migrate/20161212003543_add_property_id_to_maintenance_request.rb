class AddPropertyIdToMaintenanceRequest < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :property_id, :integer
  end
end
