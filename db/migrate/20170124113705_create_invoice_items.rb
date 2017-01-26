class CreateInvoiceItems < ActiveRecord::Migration[5.0]
  def change
    create_table :invoice_items do |t|
      t.integer :invoice_id
      t.text :item_description
      t.integer :amount
      t.timestamps
    end
  end
end
