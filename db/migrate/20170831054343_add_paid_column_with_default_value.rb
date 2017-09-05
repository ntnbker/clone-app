class AddPaidColumnWithDefaultValue < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_invoices, :paid, :boolean, default: false
  end
end
