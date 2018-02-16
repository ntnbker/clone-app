class AddRegisteredForPayment < ActiveRecord::Migration[5.0]
  def change
    add_column :tradies, :payment_registration, :boolean, :default => false
  end
end
