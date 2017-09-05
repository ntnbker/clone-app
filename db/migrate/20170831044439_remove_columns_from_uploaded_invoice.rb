class RemoveColumnsFromUploadedInvoice < ActiveRecord::Migration[5.0]
  def change
    remove_column :uploaded_invoices, :paid
    remove_column :uploaded_invoices, :invoices
    remove_column :uploaded_invoices, :invoice_data
    remove_column :uploaded_invoices, :url
  end
end
