class CreateSkills < ActiveRecord::Migration[5.0]
  def change
    create_table :skills do |t|
      t.string :skill
      t.integer :trady_id
      t.timestamps
    end
  end
end
