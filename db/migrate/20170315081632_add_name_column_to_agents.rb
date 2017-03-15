class AddNameColumnToAgents < ActiveRecord::Migration[5.0]
  def change
    add_column :agents, :name, :string
    add_column :agents, :mobile_phone, :string
    remove_column :agents, :first_name, :string
    
    
  end
end
