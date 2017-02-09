class RemoveTypeColumnFromAhoyTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :ahoy_messages, :type
  end
end
