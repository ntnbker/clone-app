class AddColumnToTradieTable < ActiveRecord::Migration[5.0]
  def change
    add_column :tradies, :tradie_company_id, :integer
  end
end
