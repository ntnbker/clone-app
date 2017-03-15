class RenamePhoneAttributeAgentsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :agents, :mobile_phone, :string
    remove_column :agents, :phone, :string
  end
end
