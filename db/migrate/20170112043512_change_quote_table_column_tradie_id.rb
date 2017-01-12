class ChangeQuoteTableColumnTradieId < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :trady_id, :integer
    remove_column :quotes, :tradie_id
  end
end
