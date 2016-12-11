class CreateGuest < ActiveRecord::Migration[5.0]
  def change
    create_table :guests do |t|
      t.integer :user_id
    end
  end
end
