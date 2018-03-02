class AddMappPaymentStatus < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :mapp_payment_status, :string, :default=> "Outstanding"
    add_column :uploaded_invoices, :due_date, :date
  end
end
