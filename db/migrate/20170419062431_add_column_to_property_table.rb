class AddColumnToPropertyTable < ActiveRecord::Migration[5.0]
  def change
    add_column :properties, :agency_id, :integer
  end
end
