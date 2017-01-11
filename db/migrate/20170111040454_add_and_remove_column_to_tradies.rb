class AddAndRemoveColumnToTradies < ActiveRecord::Migration[5.0]
  def change
    add_column :tradies , :trady_company_id, :integer
    remove_column :tradies, :tradie_company_id
  end
end
