class AddColumnMappPaymentStatusToReceipt < ActiveRecord::Migration[5.0]
  def change
    add_column :receipts, :paid, :boolean, default: false 
  end
end
