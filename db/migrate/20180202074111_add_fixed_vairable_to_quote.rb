class AddFixedVairableToQuote < ActiveRecord::Migration[5.0]
  def change
    add_column :quote_items, :min_price, :float
    add_column :quote_items, :max_price, :float
  end
end
