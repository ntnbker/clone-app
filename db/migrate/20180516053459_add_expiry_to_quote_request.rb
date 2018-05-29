class AddExpiryToQuoteRequest < ActiveRecord::Migration[5.0]
  def change
    add_column :quote_requests, :expired, :boolean, :default=> false
  end
end
