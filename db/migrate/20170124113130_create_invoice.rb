class CreateInvoice < ActiveRecord::Migration[5.0]
  def change
    create_table :invoices do |t|
      t.integer :trady_id
      t.integer :maintenance_request_id
      t.integer :amount 
      t.timestamps 
    end
  end
end
