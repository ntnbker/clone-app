class ChangeGodTableName < ActiveRecord::Migration[5.0]
  def change
    rename_table :gods, :users
  end
end
