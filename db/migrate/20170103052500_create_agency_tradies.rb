class CreateAgencyTradies < ActiveRecord::Migration[5.0]
  def change
    create_table :agency_tradies do |t|
      t.integer :agency_id
      t.integer :tradie_id
      t.timestamps                                                 
    end
  end
end
