class CreateAgencyProperties < ActiveRecord::Migration[5.0]
  def change
    create_table :agency_properties do |t|
      t.integer :property_id
      t.integer :agency_id
      t.timestamps
    end
  end
end
