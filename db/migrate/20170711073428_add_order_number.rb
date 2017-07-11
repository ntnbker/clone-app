class AddOrderNumber < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :work_order_number, :string
    add_column :invoices, :invoice_number, :string
    add_column :quotes, :quote_number, :string

  end
end
