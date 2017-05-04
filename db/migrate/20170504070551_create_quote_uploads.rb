class CreateQuoteUploads < ActiveRecord::Migration[5.0]
  def change
    create_table :uploaded_quotes do |t|
      t.string :quotes, array: true, default: []
      t.integer :maintenance_request_id
      t.boolean :delivery_status
      t.integer :trady_id
      t.timestamps

    end
  end
end
