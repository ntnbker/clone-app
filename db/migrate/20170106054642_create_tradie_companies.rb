class CreateTradieCompanies < ActiveRecord::Migration[5.0]
  def change
    create_table :tradie_companies do |t|
      t.string :company_name
      t.string :trading_name
      t.string :abn
      t.boolean :gst_registration
      t.string :address
      t.boolean :mailing_address_same
      t.string :mailing_address
      t.string :mobile_number
      t.string :email
      t.timestamps

    end

    create_table :agency_tradie_companies do |t|
      t.integer :agency_id
      t.integer :tradie_company_id
      t.timestamps
      
    end
  end
end
