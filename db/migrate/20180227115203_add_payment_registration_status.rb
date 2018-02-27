class AddPaymentRegistrationStatus < ActiveRecord::Migration[5.0]
  def change
    add_column :customer_profiles, :payment_status, :string, :default=> "Outstanding"
  end
end
