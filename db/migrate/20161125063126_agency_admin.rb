class AgencyAdmin < ActiveRecord::Migration[5.0]
  def change
    create_table :agency_admins do |t|
      t.string :company_name
      t.string :business_name
      t.string :email
      t.string :phone
      t.string :address
      t.string :first_name
      t.string :last_name
    end
  end
end
