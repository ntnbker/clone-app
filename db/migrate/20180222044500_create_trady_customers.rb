class CreateTradyCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customer_profiles do |t|

      t.integer :trady_id
      t.integer :agency_id
      t.string :customer_id
      t.timestamps
    end
  end
end
