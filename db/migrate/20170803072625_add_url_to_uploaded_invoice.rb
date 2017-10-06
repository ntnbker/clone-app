class AddUrlToUploadedInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :url, :text
  end
end
