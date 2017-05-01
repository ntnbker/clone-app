class AddTotalPerHourColumnToQuoteItems < ActiveRecord::Migration[5.0]
  def change
    add_column :quote_items, :total_per_hour, :float
  end
end
