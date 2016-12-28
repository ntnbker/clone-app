class AddMaintenanceRequestIdToConversation < ActiveRecord::Migration[5.0]
  def change
    add_column :conversations, :maintenance_request_id, :integer
  end
end
