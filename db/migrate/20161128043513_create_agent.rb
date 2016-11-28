class CreateAgent < ActiveRecord::Migration[5.0]
  def change
    create_table :agents do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.timestamps
    end
  end
end


