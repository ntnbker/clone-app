class JfmoRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :jfmo_requests do |t|
      t.integer :maintenance_request_id
      t.integer :tradie_participation_amount, :default=> 0

    end
  end
end
