class AddPasswordSetupColumnToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :password_set, :boolean, :default => false
  end
end
