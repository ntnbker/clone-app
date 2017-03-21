class CreateLedger < ActiveRecord::Migration[5.0]
  def change
    create_table :ledgers do |t|
      t.integer :grand_total
      t.timestamps
      t.integer :maintenance_request_id
    end

    add_column :invoices, :ledger_id, :integer
  end
end
