class CreateQuoteImages < ActiveRecord::Migration[5.0]
  def change
    create_table :quote_images do |t|
      t.integer :quote_id
      t.text :image_data
      t.timestamps
    end
  end
end
