class DropUserMessagesTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :user_messages
  end 
end
