class AddColumnToAgencyTradie < ActiveRecord::Migration[5.0]
  def change
    add_column :agency_tradies, :trady_id, :integer
  end
end
