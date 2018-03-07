class CreateTradyPaymentErrors < ActiveRecord::Migration[5.0]
  def change
    create_table :trady_payment_errors do |t|
      t.text :message
      t.string :http_status
      t.string :error_type
      t.string :error_code
      t.string :charge_id
    end
  end
end


