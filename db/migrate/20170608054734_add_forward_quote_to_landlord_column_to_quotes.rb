class AddForwardQuoteToLandlordColumnToQuotes < ActiveRecord::Migration[5.0]
  def change
    add_column :quotes, :forwarded_to_landlord, :boolean
  end
end
