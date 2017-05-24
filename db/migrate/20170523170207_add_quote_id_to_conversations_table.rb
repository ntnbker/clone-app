class AddQuoteIdToConversationsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :conversations, :quote_id, :integer
  end
end
