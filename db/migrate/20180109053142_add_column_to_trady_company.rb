class AddColumnToTradyCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :trady_companies, :profession_license_number, :string
    add_column :trady_companies, :landline, :string
  end
end
