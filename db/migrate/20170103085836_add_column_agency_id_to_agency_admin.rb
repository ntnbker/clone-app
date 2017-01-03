class AddColumnAgencyIdToAgencyAdmin < ActiveRecord::Migration[5.0]
  def change
    add_column :agency_admins, :agency_id, :integer
  end
end
