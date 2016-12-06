class CreateAccessContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :access_contacts do |t|
      t.string :relation
      t.string :name
      t.string :email
      t.string :mobile
      t.integer :maintenance_request_id
      t.timestamps
    end
  end
end
