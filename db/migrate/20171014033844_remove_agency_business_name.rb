class RemoveAgencyBusinessName < ActiveRecord::Migration[5.0]
  def change
    remove_column :maintenance_requests, :agency_business_name
  end
end
