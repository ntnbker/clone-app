class CreateMaintenanceRequest < ActiveRecord::Migration[5.0]
  def change
    create_table :maintenance_requests do |t|
      t.string :name 
      t.string :email 
      t.string :mobile
      t.text :access_contact
      t.string :maintenance_heading
      t.text :maintenance_description
      t.integer :image
      t.text :availability
      t.timestamps
      t.integer :agent_id 
      t.integer :tenant_id
      t.integer :tradie_id
    end
  end
end
