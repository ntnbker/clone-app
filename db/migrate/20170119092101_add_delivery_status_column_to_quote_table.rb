class AddDeliveryStatusColumnToQuoteTable < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :delivery_status, :boolean
  end
end
