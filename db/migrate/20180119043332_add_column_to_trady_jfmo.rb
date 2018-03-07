class AddColumnToTradyJfmo < ActiveRecord::Migration[5.0]
  def change
    add_column :tradies, :jfmo_participant, :boolean
  end
end
