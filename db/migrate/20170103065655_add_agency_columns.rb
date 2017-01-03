class AddAgencyColumns < ActiveRecord::Migration[5.0]
  def change
    add_column :agencies, :abn, :string
    add_column :agencies, :address, :string
    add_column :agencies, :mailing_address, :string
    add_column :agencies, :phone, :string
    add_column :agencies, :mobile_phone, :string
    add_column :agencies, :license_number, :string
    add_column :agencies, :corportation_license_number, :string
    add_column :agencies, :bdm_verification_status , :boolean
    add_column :agencies, :bdm_verification_id, :string
  end
end
