class AddTokensToUserTable < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :set_password_token, :string
    add_column :users, :id_token, :string
  end
end
