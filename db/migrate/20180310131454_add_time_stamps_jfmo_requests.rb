class AddTimeStampsJfmoRequests < ActiveRecord::Migration[5.0]
  def change
    add_column :jfmo_requests, :created_at, :datetime, default: nil, null: false
    add_column :jfmo_requests, :updated_at, :datetime, default: nil, null: false
  end
end
