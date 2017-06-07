class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.integer :maintenance_request_id
      t.text :image_data
      t.timestamps
    end
  end
end
