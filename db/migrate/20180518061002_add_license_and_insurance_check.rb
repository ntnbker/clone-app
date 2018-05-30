class AddLicenseAndInsuranceCheck < ActiveRecord::Migration[5.0]
  def change
    add_column :licenses, :licensed, :boolean
    add_column :insurances, :insured, :boolean
  end
end
