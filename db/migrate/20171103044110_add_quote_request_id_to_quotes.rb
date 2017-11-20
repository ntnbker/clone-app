class AddQuoteRequestIdToQuotes < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :quote_request_id, :integer
  end
end
