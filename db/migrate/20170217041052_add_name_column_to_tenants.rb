class AddNameColumnToTenants < ActiveRecord::Migration[5.0]
  def change
    add_column :tenants, :name, :string
  end
end
