class AddTradyColumnToTradyPaymentError < ActiveRecord::Migration[5.0]
  def change
    add_column :trady_payment_errors, :trady_id, :integer
  end
end
