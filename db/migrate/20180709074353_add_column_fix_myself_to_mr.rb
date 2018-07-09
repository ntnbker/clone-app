class AddColumnFixMyselfToMr < ActiveRecord::Migration[5.0]
  def change
    add_column :maintenance_requests, :landlord_fix_myself, :boolean
  end
end
