class AddServiceFeeToUploadedInvoices < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :service_fee, :decimal, :precision => 8, :scale => 2
    add_column :uploaded_invoices, :mapp_payment_status, :string, :default=> "Outstanding"
  end
end
