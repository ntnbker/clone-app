class CreateMaintenanceRequestImages < ActiveRecord::Migration[5.0]
  def change
    create_table :maintenance_request_images do |t|
      
      t.string :images, array: true, default: []
      t.integer :maintenance_request_id
      t.timestamps
    end
  end
end
