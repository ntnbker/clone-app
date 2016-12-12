class CreateProperties < ActiveRecord::Migration[5.0]
  def change
    create_table :properties do |t|
      t.integer :agency_admin_id
      t.integer :landlord_id
      t.string :property_address
    end
  end
end
