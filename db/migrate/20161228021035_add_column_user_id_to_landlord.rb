class AddColumnUserIdToLandlord < ActiveRecord::Migration[5.0]
  def change
    add_column :landlords, :user_id, :integer
  end
end
