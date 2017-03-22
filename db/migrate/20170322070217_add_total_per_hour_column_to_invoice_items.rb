class AddTotalPerHourColumnToInvoiceItems < ActiveRecord::Migration[5.0]
  def change
    add_column :invoice_items, :total_per_hour, :float
    add_column :invoices, :gst_amount, :float 
    
    change_column :ledgers, :grand_total, :float
    change_column :invoices, :amount, :float
    change_column :invoice_items, :amount, :float

    remove_column :invoices, :amount_paid
    remove_column :invoices, :prepaid_or_postpaid
    remove_column :invoices, :payment_status
    remove_column :invoices, :payment_installment_amount
  end
end
