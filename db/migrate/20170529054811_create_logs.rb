class CreateLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :logs do |t|
      t.integer :maintenance_request_id
      t.string :action
      t.string :name
      t.timestamps
    end
  end
end
