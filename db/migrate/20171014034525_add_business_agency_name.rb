class AddBusinessAgencyName < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :agency_business_name, :string
  end
end
