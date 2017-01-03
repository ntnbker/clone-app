class CreateTradies < ActiveRecord::Migration[5.0]
  def change
    create_table :tradies do |t|
      t.string :name
      t.string :mobile
      t.string :email
      t.integer :user_id
      t.string :skill
      t.timestamps

    end
  end
end
