class AddStatusColumnToQuoteUploads < ActiveRecord::Migration[5.0]
  def change
    add_column :uploaded_quotes, :status, :string
  end
end
