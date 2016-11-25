class ChangeGodTableNameToGods < ActiveRecord::Migration[5.0]
  def change
    rename_table :god, :gods
  end
end
