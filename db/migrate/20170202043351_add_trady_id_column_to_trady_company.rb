class AddTradyIdColumnToTradyCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :trady_companies, :trady_id, :integer 
  end
end
