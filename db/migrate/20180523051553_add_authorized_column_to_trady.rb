class AddAuthorizedColumnToTrady < ActiveRecord::Migration[5.0]
  def change
    add_column :licenses, :license_number, :string
    add_column :licenses, :license_type, :string
  end
end
