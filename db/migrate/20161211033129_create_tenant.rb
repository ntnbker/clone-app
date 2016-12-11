class CreateTenant < ActiveRecord::Migration[5.0]
  def change
    create_table :tenants do |t|
      t.string :full_name
      t.string :email
      t.string :mobile
      
      t.integer :property_id
      t.integer :user_id 
      t.timestamps
    end
  end
end
