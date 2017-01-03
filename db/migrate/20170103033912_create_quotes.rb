class CreateQuotes < ActiveRecord::Migration[5.0]
  def change
    create_table :quotes do |t|
      t.integer :amount 
      t.integer :maintenance_request_id
      t.integer :tradie_id
      t.timestamps
    end
  end
end
