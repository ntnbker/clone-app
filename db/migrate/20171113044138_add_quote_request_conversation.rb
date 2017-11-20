class AddQuoteRequestConversation < ActiveRecord::Migration[5.0]
  def change
    add_column :conversations, :quote_request_id, :integer
  end
end
