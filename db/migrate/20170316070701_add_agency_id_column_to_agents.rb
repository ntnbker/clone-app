class AddAgencyIdColumnToAgents < ActiveRecord::Migration[5.0]
  def change
    add_column :agents, :agency_id, :integer
  end
end
