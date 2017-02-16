class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :trady_id
      t.integer :tenant_id
      t.integer :appointment_id
      t.text :body 
      t.timestamps
    end
  end
end
