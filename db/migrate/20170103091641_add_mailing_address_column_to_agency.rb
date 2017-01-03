class AddMailingAddressColumnToAgency < ActiveRecord::Migration[5.0]
  def change
    add_column :agencies, :mailing_same_address, :boolean
    remove_column :agencies, :corportation_license_number
    add_column :agencies, :corporation_license_number, :string
    add_column :agencies, :license_type, :string
  end
end
