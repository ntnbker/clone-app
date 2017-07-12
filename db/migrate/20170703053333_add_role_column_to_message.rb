class AddRoleColumnToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :role, :string
  end
end
