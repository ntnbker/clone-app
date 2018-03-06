class AddServiceFeeColumnToInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :service_fee, :decimal, :precision => 8, :scale => 2
  end
end
