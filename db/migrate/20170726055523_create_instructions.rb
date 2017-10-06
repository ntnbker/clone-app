class CreateInstructions < ActiveRecord::Migration[5.0]
  def change
    create_table :instructions do |t|
      t.boolean :read_instruction
      t.integer :user_id
      t.timestamps
    end
  end
end
