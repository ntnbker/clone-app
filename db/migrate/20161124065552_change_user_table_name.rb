class ChangeUserTableName < ActiveRecord::Migration[5.0]
  def change
    rename_table :users, :god
  end
end
