class AddColumnToInvoiceActivityStatus < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :active, :boolean, :default=> true
  end
end
