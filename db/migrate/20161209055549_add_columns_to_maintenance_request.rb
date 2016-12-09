class AddColumnsToMaintenanceRequest < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :person_in_charge, :string
    add_column :maintenance_requests, :real_estate_office, :string
    add_column :maintenance_requests, :agent_name, :string
    add_column :maintenance_requests, :agent_email, :string
    add_column :maintenance_requests, :agent_mobile, :string
  end
end
