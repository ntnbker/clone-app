class CreateSuperLedger < ActiveRecord::Migration[5.0]
  def change
    create_table :super_ledgers do |t|
      t.timestamps
      t.integer :maintenance_request_id
      t.integer :ledger_id
      t.float :grand_total
    end
  end
end
