class CreateActions < ActiveRecord::Migration[5.0]
  def change
    create_table :action_statuses do |t|
      t.integer :maintenance_request_id
      t.integer :agent_id
      t.integer :agency_admin_id
      t.integer :landlord_id
      t.integer :tenant_id
      t.integer :trady_id
      t.text :maintenance_request_status
      t.text :agent_last_action
      t.text :agent_status
      t.text :landlord_last_action
      t.text :landlord_status
      t.text :trady_last_action
      t.text :trady_status
      t.text :tenant_last_action
      t.text :tenant_status
      t.timestamps
    end
  end
end
