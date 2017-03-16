class AddColumnLicenseNumberToAgencyAdmin < ActiveRecord::Migration[5.0]
  def change
    add_column :agency_admins, :license_number, :string
    
  end
end
