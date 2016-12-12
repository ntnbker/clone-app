class AddServiceTypeToMaintenanceRequest < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :service_type, :string
    
  end
end


