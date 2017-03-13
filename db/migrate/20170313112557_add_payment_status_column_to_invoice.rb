class AddPaymentStatusColumnToInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :payment_status, :string
    add_column :invoices, :amount_paid, :integer
  end
end
