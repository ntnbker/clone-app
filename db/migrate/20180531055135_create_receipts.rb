class CreateReceipts < ActiveRecord::Migration[5.0]
  def change
    create_table :receipts do |t|
      t.integer :trady_id
      t.decimal :total, :precision => 8, :scale => 2
      t.timestamps
    end

    add_column :invoices, :receipt_id, :integer
    add_column :uploaded_invoices, :receipt_id, :integer
    
  end
end
