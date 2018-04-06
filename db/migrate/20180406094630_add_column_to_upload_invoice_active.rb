class AddColumnToUploadInvoiceActive < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :active, :boolean, :default=> true
  end
end
