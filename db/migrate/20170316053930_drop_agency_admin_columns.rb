class DropAgencyAdminColumns < ActiveRecord::Migration[5.0]
  def change
    remove_column :agency_admins, :company_name
    remove_column :agency_admins, :business_name
    remove_column :agency_admins, :abn
    remove_column :agency_admins, :address
    remove_column :agency_admins, :mailing_address
    remove_column :agency_admins, :phone
    remove_column :agency_admins, :license_number
    remove_column :agency_admins, :license_type
    remove_column :agency_admins, :corporation_license_number
    remove_column :agency_admins, :bdm_verification_status
    remove_column :agency_admins, :bdm_verification_id
    remove_column :agency_admins, :mailing_same_address
  end 
end
