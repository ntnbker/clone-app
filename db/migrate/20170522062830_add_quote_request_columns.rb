class AddQuoteRequestColumns < ActiveRecord::Migration[5.0]
  def change
    add_column :quote_requests, :maintenance_request_id, :integer
    add_column :quote_requests, :trady_id, :integer
    add_column :quote_requests, :created_at, :datetime
    add_column :quote_requests, :updated_at, :datetime
  end
end
