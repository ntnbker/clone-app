class AddColumnPaymentInstallmentAndDueByToInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :payment_installment_amount, :integer
    add_column :invoices, :prepaid_or_postpaid, :string 

  end
end
