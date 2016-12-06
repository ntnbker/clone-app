class CreateAvailability < ActiveRecord::Migration[5.0]
  def change
    create_table :availabilities do |t|
      t.string :date
      t.string :start_time
      t.string :finish_time
      t.integer :maintenance_request_id
      t.timestamps
      t.boolean :available_only_by_appointment
    end
  end
end
