class AddUserIdToGodTable < ActiveRecord::Migration[5.0]
  def change
    add_column :gods, :user_id, :integer
    add_column :agency_admins, :user_id, :integer
    add_column :agency_admins, :abn, :string
    add_column :agency_admins, :mailing_address, :string
    add_column :agency_admins, :mobile_phone, :string
    add_column :agency_admins, :license_number, :string
    add_column :agency_admins, :license_type, :string
    add_column :agency_admins, :corporation_license_number,:string
    add_column :agency_admins, :bdm_verification_status, :boolean
    add_column :agency_admins, :bdm_verification_id,:string
    
  end
end
