class AddGodIdColumnToMainUsersTable < ActiveRecord::Migration[5.0]
  def change
    add_column :main_users, :god_id, :integer
  end
end
