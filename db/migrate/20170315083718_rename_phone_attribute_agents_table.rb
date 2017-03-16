class RenamePhoneAttributeAgentsTable < ActiveRecord::Migration[5.0]
  def change
    
    remove_column :agents, :phone
  end
end
