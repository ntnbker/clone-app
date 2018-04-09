class AddColumnInvoiceVoidReason < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :void_reason, :text
    add_column :uploaded_invoices, :void_reason, :text
  end
end
