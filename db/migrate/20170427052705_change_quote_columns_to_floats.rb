class ChangeQuoteColumnsToFloats < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :gst_amount, :float
    change_column :quotes, :amount, :float
    change_column :quote_items, :amount, :float
  end
end
