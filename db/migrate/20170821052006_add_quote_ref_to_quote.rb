class AddQuoteRefToQuote < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :trady_quote_reference, :text
    add_column :invoices, :trady_invoice_reference, :text
  end
end
