class AddActionCategoryColumnToActionsStatusTable < ActiveRecord::Migration[5.0]
  def change
    add_column :action_statuses, :action_category, :string
  end
end
