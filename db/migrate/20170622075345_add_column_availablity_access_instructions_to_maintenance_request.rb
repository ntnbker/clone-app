class AddColumnAvailablityAccessInstructionsToMaintenanceRequest < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :availability_and_access, :text
  end
end
