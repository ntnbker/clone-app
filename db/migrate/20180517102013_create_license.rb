class CreateLicense < ActiveRecord::Migration[5.0]
  def change
    create_table :licenses do |t|
      t.text   :image_data
      t.integer :trady_id
      t.timestamps
    end
  end
end
