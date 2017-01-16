class AddColumnToTrady < ActiveRecord::Migration[5.0]
  def change
    add_column :tradies, :company_name, :string 
  end
end
