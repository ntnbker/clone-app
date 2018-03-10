class AddJfmoStatusToMr < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :jfmo_status, :string, :default=> "Passive"
  end
end
