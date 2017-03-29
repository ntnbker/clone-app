class AddTradyIdColumnToUploadedInvoices < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :trady_id, :integer
    add_column :uploaded_invoices, :delivery_status, :boolean
  end
end
