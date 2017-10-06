class AddQuoteIdInToInvoice < ActiveRecord::Migration[5.0]
  def change
    add_column :invoices, :quote_id, :integer
  end
end
