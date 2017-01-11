class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :quote_items do |t|
      t.integer :quote_id
      t.string :item_description
      t.integer :amount
    end
  end
end
