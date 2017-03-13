class AddPriceTypeToQuoteItem < ActiveRecord::Migration[5.0]
  def change
    add_column :quote_items, :pricing_type, :string
    add_column :quote_items, :hours, :float

    add_column :invoice_items, :pricing_type, :string
    add_column :invoice_items, :hours, :float

    add_column :invoices, :tax, :boolean
    add_column :quotes, :tax, :boolean
  end
end
