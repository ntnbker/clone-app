class AddTypeColumnToAhoyMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :ahoy_messages, :type, :string
  end
end
