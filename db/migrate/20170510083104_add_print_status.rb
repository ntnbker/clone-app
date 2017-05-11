class AddPrintStatus < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :print_status, :boolean
  end
end
