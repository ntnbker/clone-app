class CreateAppointments < ActiveRecord::Migration[5.0]
  def change
    create_table :appointments do |t|
      t.integer :trady_id
      t.integer :tenant_id
      t.integer :maintenance_request_id
      t.date :date
      t.time :time
      t.string :status
      t.text :comment
      t.timestamps

    end
  end
end
