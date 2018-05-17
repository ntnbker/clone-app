class CreateInsurance < ActiveRecord::Migration[5.0]
  def change
    create_table :insurances do |t|
      t.string :insurance_company
      t.string :policy_number
      t.date :policy_expiry_date
      t.integer :trady_id
      t.timestamps
    end
  end
end
