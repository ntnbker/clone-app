class CreateInvoicePayments < ActiveRecord::Migration[5.0]
  def change
    create_table :invoice_payments do |t|
      t.integer :invoice_id
      t.string :payment_status
      t.integer :amount_paid
      t.timestamps
      t.date :date
    end
  end
end
