class AddDeliveryStatusToInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :delivery_status, :boolean
  end
end
