class AddProperColumnNameToMr < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :agency_admin_id, :integer
  end
end
