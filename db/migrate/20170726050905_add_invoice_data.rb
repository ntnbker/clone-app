class AddInvoiceData < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :invoice_data, :text
  end
end
