class CreateRoleTable < ActiveRecord::Migration[5.0]
  def change
    create_table :roles do |t|
      t.integer :user_id
      t.string :roleable_type
      t.integer :roleable_id
      t.timestamps
    end
  end
end
