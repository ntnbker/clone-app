class AddInvoiceAmountToUploadInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :total_invoice_amount, :float
  end
end
