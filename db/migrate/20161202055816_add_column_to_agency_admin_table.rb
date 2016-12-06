class AddColumnToAgencyAdminTable < ActiveRecord::Migration[5.0]
  def change
    add_column :agency_admins, :mailing_same_address, :boolean
  end
end
