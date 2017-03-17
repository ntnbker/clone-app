class AddColumnsToAgentsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :agents, :license_type, :string
    add_column :agents, :license_number, :string
    
  end
end
