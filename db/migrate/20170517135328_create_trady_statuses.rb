class CreateTradyStatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :trady_statuses do |t|
      t.integer :maintenance_request_id
      t.string :status
      t.timestamps
    end
  end

end


