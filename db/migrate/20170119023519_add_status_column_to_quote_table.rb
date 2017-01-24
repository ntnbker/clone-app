class AddStatusColumnToQuoteTable < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :status, :string
  end
end
