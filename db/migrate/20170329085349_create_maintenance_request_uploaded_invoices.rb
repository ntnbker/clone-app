class CreateMaintenanceRequestUploadedInvoices < ActiveRecord::Migration[5.0]
  def change
    create_table :uploaded_invoices do |t|
      t.string :invoices, array: true, default: []
      t.integer :maintenance_request_id
      t.timestamps

    end
  end
end
