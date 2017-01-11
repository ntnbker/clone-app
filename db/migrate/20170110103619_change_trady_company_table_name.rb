class ChangeTradyCompanyTableName < ActiveRecord::Migration[5.0]
  def change
    rename_table :tradie_companies, :trady_companies
  end
end
