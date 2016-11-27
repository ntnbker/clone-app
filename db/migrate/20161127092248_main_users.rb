class MainUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :main_users do |t|
      t.string :main_user_type
      t.timestamps
    end
  end
end
