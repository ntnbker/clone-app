class CreateSignedInRoles < ActiveRecord::Migration[5.0]
  def change
    create_table :current_roles do |t|
      t.integer :user_id
      t.string :role
      t.timestamps
    end
  end
end
