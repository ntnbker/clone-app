class AddQuoteSent < ActiveRecord::Migration[5.0]
  def change
    add_column :quote_requests, :quote_sent, :boolean
  end
end
