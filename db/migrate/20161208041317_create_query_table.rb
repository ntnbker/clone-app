class CreateQueryTable < ActiveRecord::Migration[5.0]
  def change
    create_table :queries do |t|
      t.integer :maintenance_request_id
      t.string :user_role
      t.string :tradie
      t.string :address

    end
  end
end
