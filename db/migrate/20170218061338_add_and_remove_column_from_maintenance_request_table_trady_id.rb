class AddAndRemoveColumnFromMaintenanceRequestTableTradyId < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests , :trady_id, :integer
    remove_column :maintenance_requests, :tradie_id
  end
end
